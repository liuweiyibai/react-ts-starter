import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { observable, computed, makeObservable } from 'mobx';
import { Popover, Radio, RadioChangeEvent } from 'antd';
import LiveButton from './LiveButton';

import iconCameraOn from '../../assets/images/icon-camera-on.png';
import iconCameraOff from '../../assets/images/icon-camera-off.png';
import iconCameraDis from '../../assets/images/icon-camera-dis.png';
import { IDevices } from './LiveAudioButton';
import { useStores } from 'store/hooks';

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
  [key: string]: any;
}

class LiveCameraButton extends React.Component<ILiveCameraButton> {
  @observable cameraIsOpen = true;
  @observable cameraCurrentID = 'cameraCurrentID';
  @observable cameraCurrentName = 'cameraCurrentName';
  @observable cameraList: IDevices['cameras'] = [];

  @observable icon = '';
  @observable isDisable = true;
  @observable hoverTitle = '';
  @observable hasUpperIcon = true;

  @observable isPopoverVisible = false;

  constructor(props: ILiveCameraButton) {
    super(props);
    makeObservable(this);
  }

  async onClick() {
    if (this.isDisable) return;
    // remote.app?.mainWindow?.webContents.send(LiveEvent.OnToggleCamera);
  }

  onUpperClick() {
    this.isPopoverVisible = !this.isPopoverVisible;
  }

  async onCameraChange() {
    // remote.app?.mainWindow?.webContents.send(LiveEvent.OnCameraChange, {
    //   deviceID: e.target.value,
    //   deviceName: ''
    // });
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
      />
    );
  }
}

export default observer(LiveCameraButton);
