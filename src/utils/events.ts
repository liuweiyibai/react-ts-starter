import { ZegoExpressEngine } from 'zego-express-engine-webrtc';

export const initZgEvents = (zgInstance: ZegoExpressEngine) => {
  // 房间状态更新回调
  zgInstance.on('roomStateUpdate', (roomID, state, errorCode, extendedData) => {
    if (state === 'DISCONNECTED') {
      // 与房间断开了连接
      console.log('与房间断开');
    }

    if (state === 'CONNECTING') {
      // 与房间尝试连接中
      console.log('连接中');
    }

    if (state === 'CONNECTED') {
      // 与房间连接成功
      console.log('与房间连接成功');
    }
  });

  // 用户状态更新回调
  zgInstance.on('roomUserUpdate', (roomID, updateType, userList) => {
    console.warn(
      `roomUserUpdate: room ${roomID}, user ${
        updateType === 'ADD' ? 'added' : 'left'
      } `,
      JSON.stringify(userList),
    );

    console.log('===', '用户状态', userList);
  });

  // 流状态更新回调
  zgInstance.on(
    'roomStreamUpdate',
    async (roomID, updateType, streamList, extendedData) => {
      console.log('===', 'updateType', updateType);

      if (updateType === 'ADD') {
        // 流新增，开始拉流
        console.log('===', '流', streamList);
      } else if (updateType === 'DELETE') {
        // 流删除，停止拉流
      }
    },
  );

  // 推流状态更新回调
  zgInstance.on('publisherStateUpdate', result => {
    // ...
    console.log('推流状态：', result);
  });

  // 推流质量回调
  zgInstance.on('publishQualityUpdate', (streamID, stats) => {
    // ...
    console.log('推流质量：', stats);
  });

  zgInstance.on('screenSharingEnded', stream => {
    // do something
    console.log('===', '停止屏幕共享');
  });
};
