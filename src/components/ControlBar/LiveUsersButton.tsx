import { observer } from 'mobx-react';
import React from 'react';
import { observable } from 'mobx';
import LiveButton from './LiveButton';

import iconUser from '../../assets/images/icon-user.png';

interface ILiveUsersButton {
  [key: string]: any;
}

class LiveUsersButton extends React.Component<ILiveUsersButton> {
  @observable currentIcon = iconUser;

  render() {
    return (
      <div>
        <LiveButton
          icon={this.currentIcon}
          title="Users"
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

export default observer(LiveUsersButton);
