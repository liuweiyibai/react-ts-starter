import { observer } from 'mobx-react';
import React from 'react';
import { observable } from 'mobx';
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

class LiveAudioButton extends React.Component<ILiveAudioButton> {
  @observable currentIcon = iconMicOn0;

  render() {
    return (
      <div>
        <LiveButton
          icon={this.currentIcon}
          title="Mic"
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

export default observer(LiveAudioButton);
