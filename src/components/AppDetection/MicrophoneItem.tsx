import { Select, Progress, Button } from 'antd';
import { FC, useEffect, useRef, useState } from 'react';
import { useStores } from 'store/hooks';

import { BasicProps } from './interface';
import styles from './style.module.less';

const MicrophoneItem: FC<BasicProps> = ({ nextStep }) => {
  const [soundLevel, setSoundLevel] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null!);
  const streamRef = useRef<any>(null);
  const { microphoneCurrentID, deviceInfo, zgEngine } = useStores('appStore');

  const handleAudioInputDeviceChange = () => {};

  useEffect(() => {
    // 设置是否监听音浪及音浪回调间隔时间
    zgEngine.setSoundLevelDelegate(true, 100);

    const startStream = async () => {
      streamRef.current = await zgEngine.createStream({
        camera: { video: false, audioInput: microphoneCurrentID },
      });
      videoRef.current.srcObject = streamRef.current;
    };

    startStream();

    // 本地采集音频声浪回调
    zgEngine.on('capturedSoundLevelUpdate', soundLevel => {
      setSoundLevel(soundLevel);
    });

    return () => {
      zgEngine.off('capturedSoundLevelUpdate');
      if (streamRef.current) {
        zgEngine.destroyStream(streamRef.current);
      }
    };
  }, [microphoneCurrentID]);

  return (
    <div className={styles.microphone}>
      <video ref={videoRef} autoPlay className={styles.preview_audio} />
      <div className={styles.line}>
        <div className={styles.l}>Microphone :</div>
        <Select
          defaultValue={microphoneCurrentID}
          style={{ width: 330 }}
          onChange={handleAudioInputDeviceChange}
        >
          {deviceInfo?.microphones.map(item => {
            return (
              <Select.Option key={item.deviceID} value={item.deviceID}>
                {item.deviceName}
              </Select.Option>
            );
          })}
        </Select>
      </div>
      <div className={styles.line}>
        <div className={styles.l}>音浪 :</div>
        <div className={styles.r}>
          <Progress percent={soundLevel} showInfo={false} />
        </div>
      </div>
      <div className={styles.control_bottom}>
        <Button type="primary" onClick={() => nextStep('System')}>
          下一步
        </Button>
        <Button onClick={() => nextStep('')}>重试</Button>
      </div>
    </div>
  );
};

export default MicrophoneItem;
