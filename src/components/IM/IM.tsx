import React, { useState } from 'react';
import { Tabs } from 'antd';
import Chat from './Chat';
import Users from './Users';
import './styles/IM.less';

const { TabPane } = Tabs;

function IM() {
  const [defaultActiveKey, setDefaultActiveKey] = useState('chat');

  const onChangeTab = (activeKey: string) => {
    setDefaultActiveKey(activeKey);
  };

  return (
    <Tabs activeKey={defaultActiveKey} onChange={onChangeTab}>
      <TabPane tab="Chat" key="chat">
        <Chat />
      </TabPane>
      <TabPane tab="Participants" key="participants">
        <Users />
      </TabPane>
    </Tabs>
  );
}

export default IM;
