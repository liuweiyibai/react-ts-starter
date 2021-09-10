import { observer } from 'mobx-react';
import React from 'react';
import { action, computed, makeObservable, observable } from 'mobx';
import LiveButton from './LiveButton';
import { stores } from 'store/hooks';

import iconStart from '../../assets/images/icon-start.png';
import iconEnd from '../../assets/images/icon-end.png';
import { message } from 'antd';

interface ILiveActionButton {
  [key: string]: any;
}

class LiveActionButton extends React.Component<ILiveActionButton> {
  onActionButtonClick = action(async () => {
    const { appStore } = stores;

    const state = appStore.publishingState;

    if (!appStore.screenStream) {
      message.warn('请选择要共享的屏幕');
      return;
    }

    if (state) {
      console.log('===', '停止推流');
      await appStore.stopMix();
      appStore.stopPublishing('screenStream');
      appStore.stopPublishing('cameraStream');
      appStore.togglePublishingState();
      return;
    }

    console.log('===', '开始推流');
    appStore.startPublishing('cameraStream');
    appStore.startPublishing('screenStream');
    appStore.togglePublishingState();
    await appStore.startMix();
  });

  render() {
    return (
      <div>
        <LiveButton
          icon={stores.appStore.publishingState ? iconEnd : iconStart}
          title="START"
          hasUpperIcon={false}
          hasBadge={false}
          badgeNum={0}
          isDisable={false}
          hoverTitle=""
          onClick={() => this.onActionButtonClick()}
        />
      </div>
    );
  }
}

export default observer(LiveActionButton);
