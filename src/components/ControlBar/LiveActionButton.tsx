import { observer } from 'mobx-react';
import React from 'react';
import { observable } from 'mobx';
import LiveButton from './LiveButton';

import iconStart from '../../assets/images/icon-start.png';
import iconEnd from '../../assets/images/icon-end.png';

interface ILiveActionButton {
  [key: string]: any;
}

class LiveActionButton extends React.Component<ILiveActionButton> {
  @observable currentIcon = iconStart;

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

export default observer(LiveActionButton);
