import { observer } from 'mobx-react';
import React from 'react';
import { observable, computed, makeObservable } from 'mobx';
import { Popover, Radio, Divider } from 'antd';
import LiveButton from './LiveButton';

import iconCameraOn from '../../assets/images/icon-camera-on.png';
import iconCameraOff from '../../assets/images/icon-camera-off.png';
import iconCameraDis from '../../assets/images/icon-camera-dis.png';
import { IDevices } from './LiveAudioButton';

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

  @computed get popoverContent() {
    let { cameraList, cameraCurrentID } = this;

    return (
      <div className="live-popover">
        <h3 className="title">Camera</h3>
        <Radio.Group
          onChange={this.onCameraChange}
          value={cameraCurrentID}
          key="camera"
        >
          {cameraList?.map(item => {
            return (
              <Radio value={item.deviceID} key={`camera-${item.deviceID}`}>
                {item.deviceName}
              </Radio>
            );
          })}
        </Radio.Group>
      </div>
    );
  }

  @computed get currentIcon() {
    if (this.isDisable) return iconCameraDis;
    if (this.cameraIsOpen) return iconCameraOn;

    return iconCameraOff;
  }

  render() {
    return (
      <div>
        <Popover
          placement="top"
          arrowPointAtCenter
          content={this.popoverContent}
          visible={this.isPopoverVisible}
          onVisibleChange={visible => {
            this.isPopoverVisible = visible;
          }}
        >
          <div style={{ width: '80px' }} />
        </Popover>

        <LiveButton
          icon={this.currentIcon}
          title="Camera"
          hasUpperIcon={true}
          hasBadge={false}
          badgeNum={0}
          isDisable={false}
          hoverTitle=""
          onUpperClick={() => {
            this.onUpperClick();
          }}
        />
      </div>
    );
  }
}

export default observer(LiveCameraButton);
