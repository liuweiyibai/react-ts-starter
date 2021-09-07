import { observer } from 'mobx-react';
import React from 'react';
import { observable, computed, makeObservable } from 'mobx';
import { Popover, Radio, Divider } from 'antd';
import LiveButton from './LiveButton';

import iconMicOn0 from '../../assets/images/icon-mic-on-0.png';
import iconMicOn20 from '../../assets/images/icon-mic-on-20.png';
import iconMicOn40 from '../../assets/images/icon-mic-on-40.png';
import iconMicOn60 from '../../assets/images/icon-mic-on-60.png';
import iconMicOn80 from '../../assets/images/icon-mic-on-80.png';
import iconMicOn100 from '../../assets/images/icon-mic-on-100.png';
import iconMicOff from '../../assets/images/icon-mic-off.png';
import iconMicDis from '../../assets/images/icon-mic-dis.png';

interface ILiveAudioButton {
  [key: string]: any;
}

export interface IDevices {
  cameras?: { deviceID: string; deviceName: string }[];
  microphones?: { deviceID: string; deviceName: string }[];
  speakers?: { deviceID: string; deviceName: string }[];
}

class LiveAudioButton extends React.Component<ILiveAudioButton> {
  // @observable currentIcon = iconMicOn0;

  @observable microphoneIsOpen = true;
  @observable microphoneCurrentID = 'microphoneCurrentID';
  // @observable microphoneCurrentName;
  @observable microphoneList: IDevices['microphones'] = [];
  @observable microphoneLevel = 0;

  @observable speakerIsOpen = true;
  @observable speakerCurrentID = 'speakerCurrentID';
  // @observable speakerCurrentName;
  @observable speakerList: IDevices['speakers'] = [];

  @observable icon = '';
  @observable isDisable = true;
  @observable hoverTitle = '';
  @observable hasUpperIcon = true;

  @observable isPopoverVisible = false;

  constructor(props: ILiveAudioButton) {
    super(props);
    makeObservable(this);
  }

  @computed get popoverContent() {
    let { microphoneCurrentID, microphoneList, speakerCurrentID, speakerList } =
      this;

    return (
      <div className="live-popover">
        <h3 className="title">Microphone</h3>
        <Radio.Group
          onChange={this.onMicrophoneChange}
          value={microphoneCurrentID}
          key="microphone"
        >
          {microphoneList?.map(item => {
            return (
              <Radio value={item.deviceID} key={`camera-${item.deviceID}`}>
                {item.deviceName}
              </Radio>
            );
          })}
        </Radio.Group>

        <Divider />

        <h3 className="title">Speaker</h3>
        <Radio.Group
          onChange={this.onSpeakerChange}
          value={speakerCurrentID}
          key="speaker"
        >
          {speakerList?.map(item => {
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
    if (this.isDisable) return iconMicDis;

    if (this.microphoneIsOpen) {
      if (this.microphoneLevel < 5) return iconMicOn0;
      if (this.microphoneLevel < 20) return iconMicOn20;
      if (this.microphoneLevel < 40) return iconMicOn40;
      if (this.microphoneLevel < 60) return iconMicOn60;
      if (this.microphoneLevel < 80) return iconMicOn80;
      if (this.microphoneLevel <= 200) return iconMicOn100;
    }
    return iconMicOff;
  }

  onUpperClick() {
    this.isPopoverVisible = !this.isPopoverVisible;
  }

  async onMicrophoneChange() {
    // remote.app?.mainWindow?.webContents.send(LiveEvent.OnMicrophoneChange, {
    //   deviceID: e.target.value,
    //   deviceName: ''
    // });
  }

  async onSpeakerChange() {
    // remote.app?.mainWindow?.webContents.send(LiveEvent.OnSpeakerChange, {
    //   deviceID: e.target.value,
    //   deviceName: ''
    // });
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
          title="Mic"
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

export default observer(LiveAudioButton);
