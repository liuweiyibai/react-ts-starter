import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { observable, computed, makeObservable } from 'mobx';
import { Radio, RadioChangeEvent } from 'antd';
import LiveButton from './LiveButton';

import iconCameraOn from '../../assets/images/icon-camera-on.png';
import iconCameraOff from '../../assets/images/icon-camera-off.png';
import iconCameraDis from '../../assets/images/icon-camera-dis.png';
import { useStores } from 'store/hooks';
import { ZegoDeviceInfo } from 'zego-express-engine-webrtc/sdk/code/zh/ZegoExpressEntity.web';
import AppStore from 'store/stores/AppStore';

const PopoverContent = () => {
  const { cameraCurrentID, changeCameraCurrentIDAction, deviceInfo } =
    useStores('appStore');

  const onCameraChange = (e: RadioChangeEvent) => {
    changeCameraCurrentIDAction(e.target.value);
  };
  useEffect(() => {
    console.log(2);

    return () => {};
  }, []);
  return (
    <div className="live-popover">
      <h3 className="title">Camera</h3>
      <Radio.Group
        onChange={onCameraChange}
        value={cameraCurrentID}
        key="camera"
      >
        {deviceInfo?.cameras?.map(item => {
          return (
            <Radio value={item.deviceID} key={`camera-${item.deviceID}`}>
              {item.deviceName}
            </Radio>
          );
        })}
      </Radio.Group>
    </div>
  );
};

interface ILiveCameraButton {
  appStore?: AppStore;
  [key: string]: any;
}

@inject('appStore')
@observer
class LiveCameraButton extends React.Component<ILiveCameraButton> {
  @observable cameraIsOpen = true;
  @observable hoverTitle = '';
  @observable hasUpperIcon = true;

  constructor(props: ILiveCameraButton) {
    super(props);
    makeObservable(this);
  }

  @computed get isDisable() {
    const { appStore } = this.props;
    if (appStore?.deviceInfo?.cameras) return false;
    return true;
  }

  async onClick() {
    if (this.isDisable) return;

    const { appStore } = this.props;

    appStore?.setCameraOpenState(!this.cameraIsOpen);
    this.cameraIsOpen = !this.cameraIsOpen;
  }

  @computed get currentIcon() {
    if (this.isDisable) return iconCameraDis;
    if (this.cameraIsOpen) return iconCameraOn;

    return iconCameraOff;
  }

  render() {
    return (
      <LiveButton
        icon={this.currentIcon}
        title="Camera"
        hasBadge={false}
        badgeNum={0}
        isDisable={false}
        hoverTitle=""
        hasUpperIcon
        PopoverContent={<PopoverContent />}
        onClick={() => this.onClick()}
      />
    );
  }
}

export default LiveCameraButton;
