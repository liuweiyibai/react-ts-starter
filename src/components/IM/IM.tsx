import React, { useState } from 'react';
import { Tabs } from 'antd';
import Chat from './Chat';
import Users from './Users';
import './styles/IM.less';

const { TabPane } = Tabs;

function IM() {
  const [defaultActiveKey, setDefaultActiveKey] = useState('chat');

  return (
    <Tabs activeKey={defaultActiveKey}>
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
