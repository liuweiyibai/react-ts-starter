import React, { useRef, useState } from 'react';
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

interface ICourse {
  conversationId?: string;
}

const MAX_MESSAGE_COUNT = 3000;

const leanCloud = {
  appId: 'BmhUeafJjm1eeWxttJSTS17U-MdYXbMMI',
  appKey: 'QPiyjhIznjxHML06OoSsHtBY',
};

function createRealtimeClient(): Realtime | null {
  try {
    return new Realtime({
      appId: leanCloud.appId,
      appKey: leanCloud.appKey,
    });
  } catch (e) {
    console.warn(e);
    return null;
  }
}

const realtime = createRealtimeClient()!;

function Chat() {
  const { userInfo } = useStores('userStore');
  const messageListDom = useRef<HTMLDivElement>(null!);
  const [messages, setMessages] = useState<IMsg[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [course, setCourse] = useState<ICourse>({});

  const [conversation, setConversation] =
    useState<PresistentConversation | null>(null);
  const [imClient, setImClient] = useState<IMClient | null>(null);

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
        return preMsg;
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
      return preMsg;
    });

    messageListDom.current.scrollTop = messageListDom.current.scrollHeight;

    setInputValue('');
  };

  const initIMClient = async () => {
    try {
      const imClient = await realtime.createIMClient(userInfo.userId);
      const conversation = await imClient.getConversation(
        course.conversationId as string,
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
                // content: message.content._lctext,
                content: processChatBoxLinks(_msg.content._lctext, _msg.id),
                type: _msg._lcattrs.user.type,
              };
            }),
          );

          setMessages(_messages);

          messageListDom.current.scrollTop =
            messageListDom.current.scrollHeight;
        })
        .catch(console.error.bind(console));

      imClient.on(Event.MESSAGE, (_msg, conversation) => {
        if (messages.length > MAX_MESSAGE_COUNT) {
          setMessages(preMsg => {
            preMsg.shift();
            return preMsg;
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
          return preMsg;
        });

        // let count2 = this.messages?.length;

        // this.props.zegoStore.newChatMessageCount = count2 - count1;

        messageListDom.current.scrollTop = messageListDom.current.scrollHeight;
      });

      await conversation.join();
      setIsReady(true);
    } catch (e) {
      console.error(e);
    }
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
                {msg.userName} :
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

export default Chat;
