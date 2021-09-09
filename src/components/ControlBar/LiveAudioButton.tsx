import { inject, observer } from 'mobx-react';
import React from 'react';
import { observable, makeObservable } from 'mobx';
import { Popover, Radio, Divider, RadioChangeEvent } from 'antd';
import { isEmpty } from 'lodash-es';

import AppStore from 'store/stores/AppStore';
import LiveButton from './LiveButton';
import { getCurrentAudioIconSrc } from './utils';
import { useStores } from 'store/hooks';

const PopoverContent = observer(() => {
  const {
    deviceInfo,
    microphoneCurrentID,
    speakerCurrentID,
    changeMicrophoneCurrentIDAction,
    changeSpeakerCurrentIDAction,
  } = useStores('appStore');

  const onMicrophoneChange = (e: RadioChangeEvent) => {
    changeMicrophoneCurrentIDAction(e.target.value);
  };

  const onSpeakerChange = (e: RadioChangeEvent) => {
    changeSpeakerCurrentIDAction(e.target.value);
  };

  return (
    <div className="live-popover">
      <h3 className="title">麦克风</h3>
      <Radio.Group
        onChange={onMicrophoneChange}
        value={microphoneCurrentID}
        key="microphone"
      >
        {deviceInfo?.microphones?.map(item => {
          return (
            <Radio value={item.deviceID} key={`camera-${item.deviceID}`}>
              {item.deviceName}
            </Radio>
          );
        })}
      </Radio.Group>

      <Divider />

      <h3 className="title">扬声器</h3>
      <Radio.Group
        onChange={onSpeakerChange}
        value={speakerCurrentID}
        key="speaker"
      >
        {deviceInfo?.speakers?.map(item => {
          return (
            <Radio value={item.deviceID} key={`camera-${item.deviceID}`}>
              {item.deviceName}
            </Radio>
          );
        })}
      </Radio.Group>
    </div>
  );
});

interface ILiveAudioButton {
  appStore?: AppStore;
  [key: string]: any;
}

export interface IDevices {
  cameras?: { deviceID: string; deviceName: string }[];
  microphones?: { deviceID: string; deviceName: string }[];
  speakers?: { deviceID: string; deviceName: string }[];
}
@inject('appStore', 'userStore')
@observer
class LiveAudioButton extends React.Component<ILiveAudioButton> {
  // @observable currentIcon = iconMicOn0;

  @observable microphoneIsOpen = true;
  @observable microphoneCurrentID = 'microphoneCurrentID';
  // @observable microphoneCurrentName;
  @observable microphoneList: IDevices['microphones'] = [];
  @observable microphoneLevel = 0;

  @observable speakerIsOpen = true;
  // @observable speakerCurrentID = 'speakerCurrentID';
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

  componentDidMount() {
    // 检查 store 中是否存在 设备列表
    const { appStore } = this.props;
    if (isEmpty(appStore?.deviceInfo)) {
      appStore?.getDevicesAction();
    }
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

  handleVisibleChange = (visible: boolean) => {
    this.isPopoverVisible = visible;
  };

  render() {
    const { isDisable, microphoneLevel, microphoneIsOpen, props } = this;
    // const { appStore } = props;
    return (
      <LiveButton
        icon={getCurrentAudioIconSrc(
          isDisable,
          microphoneLevel,
          microphoneIsOpen,
        )}
        title="Mic"
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

export default LiveAudioButton;
