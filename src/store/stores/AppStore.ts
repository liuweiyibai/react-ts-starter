import { action, makeObservable, observable } from 'mobx';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';
import type {
  ZegoDeviceInfo,
  ZegoDeviceInfos,
  ZegoMixStreamInput,
} from 'zego-express-engine-webrtc/sdk/code/zh/ZegoExpressEntity.web';

import { storage } from 'utils/storage';
import {
  CAMERA_CURRENT_ID,
  SPEAKER_CURRENT_ID,
  MICROPHONE_CURRENT_ID,
} from 'utils/var';
import { ICourseDataType, IStreamType } from './interface';
import { compSystemDeviceList } from 'utils/tool';

type TypeZegoDeviceInfos = ZegoDeviceInfos | null;

// 初始化实例
const zgEngine = new ZegoExpressEngine(
  Number(process.env.REACT_APP_ZEGO_APP_ID),
  process.env.REACT_APP_ZEGO_SERVER,
);

// 全局的store
export default class AppStore {
  // 是否展示硬件测试
  public visibleAppDetection = false;
  public deviceInfo: TypeZegoDeviceInfos = null;
  public zgEngine: ZegoExpressEngine = zgEngine;
  public cameraCurrentID = '';
  public speakerCurrentID = '';
  public microphoneCurrentID = '';
  public userListMap = new Map();
  // 当前课程
  public courseData: ICourseDataType = null;
  // 流
  public cameraStream: MediaStream | null = null;
  public screenStream: MediaStream | null = null;
  // 推流状态
  public publishingState = false;

  constructor() {
    makeObservable(this, {
      visibleAppDetection: observable,
      deviceInfo: observable,
      cameraCurrentID: observable,
      speakerCurrentID: observable,
      microphoneCurrentID: observable,
      userListMap: observable,
      courseData: observable,
      cameraStream: observable,
      screenStream: observable,
      publishingState: observable,
      toggleVisibleAppDetection: action.bound,
      getDevicesAction: action.bound,
      setUserListMap: action.bound,
      changeCameraCurrentIDAction: action.bound,
      changeMicrophoneCurrentIDAction: action.bound,
      changeSpeakerCurrentIDAction: action.bound,
      setStream: action.bound,
      setCourseData: action.bound,
      createScreenStream: action.bound,
      togglePublishingState: action.bound,
    });
  }
  toggleVisibleAppDetection() {
    this.visibleAppDetection = !this.visibleAppDetection;
  }

  // 修改摄像头 id
  changeCameraCurrentIDAction(id: string) {
    storage.set(CAMERA_CURRENT_ID, id);
    this.cameraCurrentID = id;
    this.setCamera(id);
  }

  // 修改麦克风 id
  changeMicrophoneCurrentIDAction(id: string) {
    storage.set(MICROPHONE_CURRENT_ID, id);
    this.microphoneCurrentID = id;
    this.setMicrophone(id);
  }

  // 修改扬声器 id
  changeSpeakerCurrentIDAction(id: string) {
    storage.set(SPEAKER_CURRENT_ID, id);
    this.speakerCurrentID = id;
  }

  async getDevicesAction() {
    const resp = await zgEngine.enumDevices();
    compSystemDeviceList(resp);

    const getOrSet = (key: string, deviceId: string) => {
      const localRes = storage.get(key);
      if (localRes) return localRes;
      storage.set(key, deviceId);
      return deviceId;
    };

    if (resp.cameras.length) {
      const deviceId = resp.cameras[0].deviceID;
      this.cameraCurrentID = getOrSet(CAMERA_CURRENT_ID, deviceId);
    }

    if (resp.speakers.length) {
      const deviceId = resp.speakers[0].deviceID;
      this.speakerCurrentID = getOrSet(SPEAKER_CURRENT_ID, deviceId);
    }

    if (resp.microphones.length) {
      const deviceId = resp.microphones[0].deviceID;
      this.microphoneCurrentID = getOrSet(MICROPHONE_CURRENT_ID, deviceId);
    }
    this.deviceInfo = resp;
  }

  // 设置用户列表
  setUserListMap(
    key: string,
    val: { userID: string; userName: string; online: boolean },
  ) {
    this.userListMap.set(key, val);
  }

  // 设置流
  setStream(streamType: keyof IStreamType, streamObj: MediaStream) {
    this[streamType] = streamObj;
  }

  // 创建屏幕共享流
  async createScreenStream(
    previewVideoDom: HTMLVideoElement = document.getElementById(
      'preview-video',
    ) as HTMLVideoElement,
  ) {
    let screenStream = await this.zgEngine.createStream({
      screen: {
        // audio: document.getElementById('isScreenAudio').value == 'yes' ? true : false,
        audio: true,
        videoQuality: 4,
        bitRate: 3000,
        frameRate: 15,
        width: 1920,
        height: 1080,
        startBitrate: 'target',
      },
    });

    previewVideoDom.srcObject = screenStream;

    this.setStream('screenStream', screenStream);
  }

  // 销毁流
  destroyStream(streamType: keyof IStreamType) {
    if (this[streamType]) {
      this.zgEngine.destroyStream(this[streamType]!);
    }
  }

  // 开始推流
  startPublishing(streamType: keyof IStreamType) {
    let streamId =
      streamType === 'cameraStream'
        ? this.courseData?.liveMainStreamId
        : this.courseData?.liveAuxStreamId;

    const result =
      this.courseData &&
      this.zgEngine.startPublishingStream(streamId!, this[streamType]!);
  }

  // 停止推流
  stopPublishing(streamType: keyof IStreamType) {
    let streamId =
      streamType === 'cameraStream'
        ? this.courseData?.liveMainStreamId
        : this.courseData?.liveAuxStreamId;

    const result =
      this.courseData && this.zgEngine.stopPublishingStream(streamId!);
  }

  // 切换推流状态
  togglePublishingState() {
    this.publishingState = !this.publishingState;
  }

  // 开始混流
  async startMix() {
    if (!this.courseData) return;
    try {
      const streamList: ZegoMixStreamInput[] = [
        {
          streamID: this.courseData.liveMainStreamId!,
          layout: {
            top: 0,
            left: 0,
            bottom: 240,
            right: 320,
          },
        },
        {
          streamID: this.courseData.liveAuxStreamId!,
          layout: {
            top: 0,
            left: 0,
            bottom: 1080,
            right: 1920,
          },
        },
      ];
      const res = await this.zgEngine.startMixerTask({
        taskID: this.courseData.liveRoomId!,
        inputList: streamList,
        outputList: [
          {
            target: this.courseData.liveMixStreamId!,
          },
        ],
        outputConfig: {
          outputBitrate: 3000,
          outputFPS: 15,
          outputWidth: 1920,
          outputHeight: 1080,
        },
      });
      console.log('===', '混流成功');
    } catch (e) {
      console.error('混流失败');
    }
  }
  // 停止混流
  async stopMix() {
    if (!this.courseData) return;
    try {
      await this.zgEngine.stopMixerTask(this.courseData.liveRoomId!);
      console.log('===', '停止混流成功');
    } catch (err) {
      console.error('===', '停止混流失败', err);
    }
  }

  // 切换话筒打开状态
  setMicrophoneOpenState(openState: boolean) {
    // this.zgEngine.muteMicrophone(openState);
    this.zgEngine.mutePublishStreamAudio(this.cameraStream!, !openState);
  }

  // 切换摄像头打开状态
  setCameraOpenState(openState: boolean) {
    this.zgEngine.mutePublishStreamVideo(this.cameraStream!, !openState);
  }

  // 设置话筒
  setMicrophone(deviceID: ZegoDeviceInfo['deviceID']) {
    console.log('===', this.cameraStream);
    this.zgEngine.useAudioDevice(this.cameraStream!, deviceID);
  }

  // 设置摄像头
  setCamera(deviceID: ZegoDeviceInfo['deviceID']) {
    this.zgEngine.useAudioDevice(this.cameraStream!, deviceID);
  }

  // 修改课程信息
  setCourseData(course: ICourseDataType) {
    this.courseData = course;
  }
}
