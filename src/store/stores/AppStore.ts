import { action, makeObservable, observable } from 'mobx';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';
import type { ZegoDeviceInfos } from 'zego-express-engine-webrtc/sdk/code/zh/ZegoExpressEntity.web';

import { storage } from 'utils/storage';
import {
  CAMERA_CURRENT_ID,
  SPEAKER_CURRENT_ID,
  MICROPHONE_CURRENT_ID,
} from 'utils/var';
import { compSystemDeviceList } from 'utils/tool';

type TypeZegoDeviceInfos = ZegoDeviceInfos | null;

// 初始化实例
const zgEngine = new ZegoExpressEngine(
  Number(process.env.REACT_APP_ZEGO_APP_ID),
  process.env.REACT_APP_ZEGO_SERVER,
);

zgEngine.setLogConfig({
  logLevel: process.env.NODE_ENV === 'production' ? 'disable' : 'debug',
});

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
  constructor() {
    makeObservable(this, {
      visibleAppDetection: observable,
      deviceInfo: observable,
      cameraCurrentID: observable,
      speakerCurrentID: observable,
      microphoneCurrentID: observable,
      toggleVisibleAppDetection: action.bound,
      getDevicesAction: action.bound,
      userListMap: observable,
      setUserListMap: action.bound,
      changeCameraCurrentIDAction: action.bound,
      changeMicrophoneCurrentIDAction: action.bound,
      changeSpeakerCurrentIDAction: action.bound,
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

  setUserListMap(
    key: string,
    val: { userID: string; userName: string; online: boolean },
  ) {
    this.userListMap.set(key, val);
  }
}
