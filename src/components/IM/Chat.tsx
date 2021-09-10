import React, { useEffect, useRef, useState } from 'react';
import { Input } from 'antd';
import {
  Realtime,
  Event,
  TextMessage,
  IMClient,
  PresistentConversation,
  Message,
} from 'leancloud-realtime';
import { useStores } from 'store/hooks';
import styles from './styles/Chat.module.less';
import { processChatBoxLinks } from 'utils/tool';
import {
  ZegoRTMEvent,
  ZegoUser,
} from 'zego-express-engine-webrtc/sdk/src/common/zego.entity';
import { ICourseData, ICourseDataType } from 'store/stores/interface';
import { observer } from 'mobx-react';

// 经过摘取字段的消息
export interface IMsg {
  type: string;
  userId?: string;
  id: string;
  content: string;
  anonymousName: string;
  userName: string;
}

interface IMessageToSend extends Message {
  [key: string]: any;
}

const MAX_MESSAGE_COUNT = 3000;

function createRealtimeClient(): Realtime | null {
  try {
    return new Realtime({
      appId: process.env.REACT_APP_LEANCLOUD_ID!,
      appKey: process.env.REACT_APP_LEANCLOUD_KEY!,
    });
  } catch (e) {
    console.warn(e);
    return null;
  }
}

const realtime = createRealtimeClient()!;

function Chat() {
  // const { userInfo } = useStores('userStore');
  const { courseData } = useStores('appStore');
  const userInfo = { id: 'test', userName: 'zyd-test', userId: 'test-userId' };

  const { userListMap, setUserListMap, zgEngine } = useStores('appStore');

  const messageListDom = useRef<HTMLDivElement>(null!);
  const [messages, setMessages] = useState<IMsg[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [course, setCourse] = useState<ICourseData['preLiveCourse'] | null>(
    null,
  );

  const [conversation, setConversation] =
    useState<PresistentConversation | null>(null);
  const [imClient, setImClient] = useState<IMClient | null>(null);

  useEffect(() => {
    setCourse(courseData?.preLiveCourse);
  }, [courseData]);

  useEffect(() => {
    initIMClient();
  }, [course]);

  useEffect(() => {
    initRoomUserList();
  }, []);

  useEffect(() => {
    return () => {
      if (zgEngine) zgEngine.off('roomUserUpdate');
    };
  }, [zgEngine]);

  useEffect(() => {
    initIMEvent();
  }, [imClient]);

  const sendMessage = async () => {
    if (!conversation) return;
    if (!inputValue) return;

    let messageToSent: IMessageToSend = new TextMessage(inputValue);

    messageToSent.attributes = {
      user: {
        id: userInfo.id,
        nickName: userInfo.userName,
        // anonymousName: '',
        type: 2,
      },
    };

    await conversation.send(messageToSent);

    if (messages.length > MAX_MESSAGE_COUNT) {
      setMessages(preMsg => {
        preMsg.shift();
        return [...preMsg];
      });
    }

    setMessages(preMsg => {
      preMsg.push({
        id: messageToSent.id,
        userId: messageToSent._lcattrs.user.id,
        userName: messageToSent._lcattrs.user.nickName,
        anonymousName: messageToSent._lcattrs.user?.anonymousName,
        content: processChatBoxLinks(messageToSent._lctext, messageToSent.id),
        type: messageToSent._lcattrs.user.type,
      });
      return [...preMsg];
    });

    messageListDom.current.scrollTop = messageListDom.current.scrollHeight;

    setInputValue('');
  };

  const initRoomUserList = () => {
    const env = process.env;
    let zgUserId = `${env}-mt-${userInfo.userId}`;

    setUserListMap(zgUserId, {
      userID: zgUserId,
      userName: userInfo.userName,
      online: true,
    });
  };

  const initIMClient = async () => {
    if (!course) return;

    try {
      const imClient = await realtime.createIMClient(userInfo.userId);
      const conversation = await imClient.getConversation(
        course.conversationId!,
      );

      setImClient(imClient);
      setConversation(conversation);

      conversation
        .queryMessages({
          limit: 100, // limit 取值范围 1~100，默认 20
        })
        .then(_msgs => {
          let _messages = messages.concat(
            _msgs.map(msg => {
              let _msg: IMessageToSend = msg!;

              return {
                id: _msg.id,
                userId: _msg._lcattrs.user.id,
                userName: _msg._lcattrs.user.nickName,
                anonymousName: _msg._lcattrs.user?.anonymousName,
                content: processChatBoxLinks(_msg.content._lctext, _msg.id),
                type: _msg._lcattrs.user.type,
              };
            }),
          );

          setMessages(_messages);
          chatBoxScrollToBottom();
        })
        .catch(console.error.bind(console));

      await conversation.join();
      setIsReady(true);
    } catch (e) {
      console.error(e);
    }

    zgEngine.on('roomUserUpdate', onRoomUserUpdate);
  };

  const initIMEvent = () => {
    if (!imClient) return;

    imClient.on(Event.MESSAGE, (_msg, conversation) => {
      if (messages.length > MAX_MESSAGE_COUNT) {
        setMessages(preMsg => {
          preMsg.shift();
          return [...preMsg];
        });
      }
      // let count1 = messages?.length;

      let _message: IMessageToSend = _msg!;

      setMessages(preMsg => {
        preMsg.push({
          id: _message.id,
          userId: _message._lcattrs.user.id,
          userName: _message._lcattrs.user.nickName,
          anonymousName: _message._lcattrs.user?.anonymousName,
          content: processChatBoxLinks(_message.content._lctext, _message.id),
          type: _message._lcattrs.user.type,
        });
        return [...preMsg];
      });

      // let count2 = this.messages?.length;

      // this.props.zegoStore.newChatMessageCount = count2 - count1;

      chatBoxScrollToBottom();
    });
  };

  const chatBoxScrollToBottom = () => {
    messageListDom.current.scrollTop = messageListDom.current.scrollHeight;
  };

  const onRoomUserUpdate: ZegoRTMEvent['roomUserUpdate'] = (
    roomID: string,
    updateType: 'DELETE' | 'ADD',
    userList: ZegoUser[],
  ) => {
    userList.forEach(x => {
      setUserListMap(x.userID, {
        userID: x.userID,
        userName: x.userName!,
        online: updateType === 'ADD' ? true : false,
      });
    });
  };

  return (
    <div className={styles['message-container']}>
      <div className={styles['message-list']} ref={messageListDom}>
        {messages.map(msg => {
          if (msg.type === 'system') {
            return (
              <div key={msg.id} className={styles['message-item']}>
                <span className={styles['system-msg']}>{msg.content}</span>
              </div>
            );
          }

          return (
            <div key={msg.id} className={styles['message-item']}>
              <span
                className={`${styles['username']} ${
                  String(msg.type) === '2' ? styles['yellow'] : ''
                }`}
              >
                {msg.anonymousName && (
                  <span className={styles['anonymous-name']}>
                    {msg.anonymousName}
                  </span>
                )}
                {msg.userName}: &nbsp;
              </span>
              <span
                className={styles['msg']}
                dangerouslySetInnerHTML={{ __html: msg.content }}
              />
            </div>
          );
        })}
      </div>
      <div className={styles['input-wrp']}>
        <Input
          disabled={!isReady}
          placeholder="Say something..."
          size="large"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onPressEnter={sendMessage}
        />
      </div>
    </div>
  );
}

export default observer(Chat);
