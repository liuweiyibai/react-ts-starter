import { FC } from 'react';
import styles from './styles/ControlBar.module.less';
import LiveAudioButton from './LiveAudioButton';
import LiveCameraButton from './LiveCameraButton';
import LiveCaptureButton from './LiveCaptureButton';
import LiveChatButton from './LiveChatButton';
import LiveUsersButton from './LiveUsersButton';
import LiveActionButton from './LiveActionButton';

const ControlBar: FC = () => {
  return (
    <div className={styles.controlBarWrap}>
      <LiveAudioButton />
      <LiveCameraButton />
      <LiveCaptureButton />
      <LiveChatButton />
      <LiveUsersButton />
      <LiveActionButton />
    </div>
  );
};

export default ControlBar;
