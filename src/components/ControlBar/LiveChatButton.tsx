import { observer } from 'mobx-react';
import React from 'react';
import { observable } from 'mobx';
import LiveButton from './LiveButton';

import iconChat from '../../assets/images/icon-chat.png';

interface ILiveChatButton {
  [key: string]: any;
}

class LiveChatButton extends React.Component<ILiveChatButton> {
  @observable currentIcon = iconChat;

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

export default observer(LiveChatButton);
