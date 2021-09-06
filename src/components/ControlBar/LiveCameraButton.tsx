import { observer } from 'mobx-react';
import React from 'react';
import { observable } from 'mobx';
import LiveButton from './LiveButton';

import iconCameraOn from '../../assets/images/icon-camera-on.png';
import iconCameraOff from '../../assets/images/icon-camera-off.png';
import iconCameraDis from '../../assets/images/icon-camera-dis.png';

interface ILiveCameraButton {
  [key: string]: any;
}

class LiveCameraButton extends React.Component<ILiveCameraButton> {
  @observable currentIcon = iconCameraOn;

  render() {
    return (
      <div>
        <LiveButton
          icon={this.currentIcon}
          title="Camera"
          hasUpperIcon={true}
          hasBadge={false}
          badgeNum={0}
          isDisable={false}
          hoverTitle=""
        />
      </div>
    );
  }
}

export default observer(LiveCameraButton);
