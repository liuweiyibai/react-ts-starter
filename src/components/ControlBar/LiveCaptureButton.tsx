import { observer } from 'mobx-react';
import React from 'react';
import { stores } from '../../store/hooks';
import LiveButton from './LiveButton';

import iconScreen from '../../assets/images/icon-screen.png';

interface ILiveCaptureButton {
  [key: string]: any;
}

class LiveCaptureButton extends React.Component<ILiveCaptureButton> {
  async onScreenShare() {
    const { appStore } = stores;
    await appStore.createScreenStream();
  }

  render() {
    return (
      <div>
        <LiveButton
          icon={iconScreen}
          title="Share"
          hasUpperIcon={false}
          hasBadge={false}
          badgeNum={0}
          isDisable={false}
          hoverTitle=""
          onClick={this.onScreenShare}
        />
      </div>
    );
  }
}

export default observer(LiveCaptureButton);
