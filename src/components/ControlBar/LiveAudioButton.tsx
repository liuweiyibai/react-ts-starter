import { inject, observer } from 'mobx-react';
import React from 'react';
import { observable, makeObservable, computed, action } from 'mobx';
import { Radio, Divider, RadioChangeEvent } from 'antd';
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

@inject('appStore', 'userStore')
@observer
class LiveAudioButton extends React.Component<ILiveAudioButton> {
  @observable microphoneIsOpen = true;
  @observable microphoneCurrentID = 'microphoneCurrentID';
  @observable microphoneLevel = 0;
  @observable hoverTitle = '';
  @observable hasUpperIcon = true;

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

    appStore?.zgEngine.on(
      'capturedSoundLevelUpdate',
      action(res => {
        this.microphoneLevel = ~~res;
      }),
    );
  }

  @computed get isDisable() {
    const { appStore } = this.props;
    if (appStore?.deviceInfo?.microphones) return false;

    appStore?.zgEngine.setSoundLevelDelegate(true, 400);
    return true;
  }

  @action
  onToggleMicrophone = () => {
    if (this.isDisable) return;

    const { appStore } = this.props;

    appStore?.setMicrophoneOpenState(!this.microphoneIsOpen);
    this.microphoneIsOpen = !this.microphoneIsOpen;
  };

  render() {
    const { isDisable, microphoneLevel, microphoneIsOpen } = this;

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
        onClick={() => this.onToggleMicrophone()}
      />
    );
  }
}

export default LiveAudioButton;
