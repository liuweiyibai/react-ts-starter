import { action, makeObservable, observable } from 'mobx';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';
import type { ZegoDeviceInfos } from 'zego-express-engine-webrtc/sdk/code/zh/ZegoExpressEntity.web';

type TypeZegoDeviceInfos = ZegoDeviceInfos | null;

// 初始化实例
const zgEngine = new ZegoExpressEngine(
  2134092766,
  'wss://webliveroom-hk-test.zegocloud.com/ws',
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
  constructor() {
    makeObservable(this, {
      visibleAppDetection: observable,
      deviceInfo: observable,
      cameraCurrentID: observable,
      speakerCurrentID: observable,
      toggleVisibleAppDetection: action.bound,
      getDevicesAction: action.bound,
    });
  }
  toggleVisibleAppDetection() {
    this.visibleAppDetection = !this.visibleAppDetection;
  }

  async getDevicesAction() {
    const resp = await zgEngine.enumDevices();
    if (resp.cameras.length) {
      this.cameraCurrentID = resp.cameras[0].deviceID;
    }

    if (resp.speakers.length) {
      this.speakerCurrentID = resp.speakers[0].deviceID;
    }

    if (resp.microphones.length) {
      this.microphoneCurrentID = resp.microphones[0].deviceID;
    }
    console.log(resp);
    this.deviceInfo = resp;
  }
}
