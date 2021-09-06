import React, { FC } from 'react';
import { Button } from 'antd';
import styles from './LiveRoom.module.less';
import ControlBar from 'components/ControlBar';

const LiveRoom: FC = () => {
  return (
    <div className={styles.liveRoomWrap}>
      <div className={styles.header}>
        <div className={styles.roomId}>ID: 123456-6897548-9686</div>
        <div className={styles.back}>
          <Button danger type="primary">
            退出直播间
          </Button>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles['preview-box']}>
            {/* http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4 */}
            <video
              src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
              muted
              autoPlay
              id="preview-video"
            />
          </div>
        </div>

        <div className={styles['right-side']}>
          <div className={styles['camera-box']}>
            <video
              src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
              muted
              autoPlay
              id="camera-video"
            />
          </div>
          <div className={styles['function-box']} />
        </div>
      </div>

      <div className={styles.footer}>
        <ControlBar />
      </div>
    </div>
  );
};

export default LiveRoom;
