import { observer } from 'mobx-react';
import React from 'react';
import { observable } from 'mobx';
import LiveButton from './LiveButton';

import iconScreen from '../../assets/images/icon-screen.png';

interface ILiveCaptureButton {
  [key: string]: any;
}

class LiveCaptureButton extends React.Component<ILiveCaptureButton> {
  @observable currentIcon = iconScreen;

  render() {
    return (
      <div>
        <LiveButton
          icon={this.currentIcon}
          title="Share"
          hasUpperIcon={false}
          hasBadge={false}
          badgeNum={0}
          isDisable={false}
          hoverTitle=""
        />
      </div>
    );
  }
}

export default observer(LiveCaptureButton);
