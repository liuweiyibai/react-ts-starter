import { Select, Progress, Slider, Button } from 'antd';
import { FC } from 'react';
import { BasicProps } from './interface';
import styles from './style.module.less';

const microphoneList: any[] = [];

const MicrophoneItem: FC<BasicProps> = () => {
  const handleAudioInputDeviceChange = () => {};
  const zegoStore = {
    microphoneCurrentID: '',
  };
  const soundLevel = 1;

  const volume = 0;
  const onVolumeChange = () => {};
  const nextStep = () => {};
  return (
    <div className={styles.microphone}>
      <div className={styles.line}>
        <div className={styles.l}>Microphone :</div>
        <Select
          defaultValue={zegoStore.microphoneCurrentID}
          style={{ width: 300 }}
          onChange={handleAudioInputDeviceChange}
        >
          {microphoneList.map(item => {
            return (
              <Select.Option key={item.deviceID} value={item.deviceID}>
                {item.deviceName}
              </Select.Option>
            );
          })}
        </Select>
      </div>
      <div className={styles.line}>
        <div className={styles.l}>Test :</div>
        <div className={styles.r}>
          <Progress percent={soundLevel} showInfo={false} />
        </div>
      </div>
      <div className={styles.line}>
        <div className={styles.l}>Volume :</div>
        <div className={styles.r}>
          <Slider defaultValue={volume} onAfterChange={onVolumeChange} />
        </div>
      </div>
      <div className={styles.control_bottom}>
        <Button type="primary" onClick={() => nextStep()}>
          Able to look
        </Button>
        <Button onClick={() => nextStep()}>Unable to look</Button>
      </div>
    </div>
  );
};

export default MicrophoneItem;
