import { observer } from 'mobx-react';
import React from 'react';
import { stores } from '../../store/hooks';
import LiveButton from './LiveButton';

import iconScreen from '../../assets/images/icon-screen.png';
import { IControlBarProps } from './ControlBar';

interface ILiveCaptureButton {
  [key: string]: any;
}

class LiveCaptureButton extends React.Component<
  ILiveCaptureButton & IControlBarProps
> {
  // async onScreenShare() {
  //   const { appStore } = stores;
  //   await appStore.createScreenStream();
  // }

  render() {
    const { props } = this;
    return (
      <LiveButton
        icon={iconScreen}
        title="Share"
        hasUpperIcon={false}
        hasBadge={false}
        badgeNum={0}
        isDisable={false}
        hoverTitle=""
        onClick={props.onCaptureClick}
      />
    );
  }
}

export default observer(LiveCaptureButton);
