import { action, makeObservable, observable } from 'mobx';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';
import type { ZegoDeviceInfos } from 'zego-express-engine-webrtc/sdk/code/zh/ZegoExpressEntity.web';

import { storage } from 'utils/storage';
import {
  CAMERA_CURRENT_ID,
  SPEAKER_CURRENT_ID,
  MICROPHONE_CURRENT_ID,
} from 'utils/var';
import { ICourseDataType, IStreamType } from './interface';

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

  constructor() {
    makeObservable(this, {
      visibleAppDetection: observable,
      deviceInfo: observable,
      cameraCurrentID: observable,
      speakerCurrentID: observable,
      microphoneCurrentID: observable,
      cameraStream: observable,
      screenStream: observable,
      toggleVisibleAppDetection: action.bound,
      getDevicesAction: action.bound,
      userListMap: observable,
      setUserListMap: action.bound,
      changeCameraCurrentIDAction: action.bound,
      changeMicrophoneCurrentIDAction: action.bound,
      changeSpeakerCurrentIDAction: action.bound,
      setStream: action.bound,
      setCourseData: action.bound,
    });
  }
  toggleVisibleAppDetection() {
    this.visibleAppDetection = !this.visibleAppDetection;
  }

  // 修改摄像头 id
  changeCameraCurrentIDAction(id: string) {
    storage.set(CAMERA_CURRENT_ID, id);
    this.cameraCurrentID = id;
  }

  // 修改麦克风 id
  changeMicrophoneCurrentIDAction(id: string) {
    storage.set(MICROPHONE_CURRENT_ID, id);
    this.microphoneCurrentID = id;
  }

  // 修改扬声器 id
  changeSpeakerCurrentIDAction(id: string) {
    storage.set(SPEAKER_CURRENT_ID, id);
    this.speakerCurrentID = id;
  }

  async getDevicesAction() {
    const resp = await zgEngine.enumDevices();
    if (resp.cameras.length) {
      this.cameraCurrentID =
        storage.get(CAMERA_CURRENT_ID) || resp.cameras[0].deviceID;
    }

    if (resp.speakers.length) {
      this.speakerCurrentID =
        storage.get(SPEAKER_CURRENT_ID) || resp.speakers[0].deviceID;
    }

    if (resp.microphones.length) {
      this.microphoneCurrentID =
        storage.get(MICROPHONE_CURRENT_ID) || resp.microphones[0].deviceID;
    }
    this.deviceInfo = resp;
  }

  // 修改用户列表
  setUserListMap(
    key: string,
    val: { userID: string; userName: string; online: boolean },
  ) {
    this.userListMap.set(key, val);
  }

  // 修改流
  setStream(streamType: keyof IStreamType, streamObj: MediaStream) {
    this[streamType] = streamObj;
  }

  // 修改课程信息
  setCourseData(course: ICourseDataType) {
    this.courseData = course;
  }
}
