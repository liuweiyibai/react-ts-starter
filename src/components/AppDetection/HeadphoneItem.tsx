import { Button, Select } from 'antd';
import { FC, useState, useEffect } from 'react';
import styles from './style.module.less';
import iconSoundStopImg from 'assets/images/stop-sound.png';
import iconSoundStartImg from 'assets/images/start-sound.png';
import soundSrc from 'assets/sounds/demo-sound.ogg';

import { useAudio } from 'react-use';
const speakerList: any[] = [];

const HeadphoneItem: FC = () => {
  const [isAduioPlaying, setIsAduioPlaying] = useState(false);
  const [audio, _, controls] = useAudio({
    src: soundSrc,
    autoPlay: false,
  });

  const handleAudioOutputDeviceChange = () => {};

  const nextStep = () => {};

  const zegoStore = { speakerCurrentID: '' };

  const toggleAudioPlayer = () => {
    setIsAduioPlaying(!isAduioPlaying);
  };

  useEffect(() => {
    if (isAduioPlaying) {
      controls.pause();
    } else {
      controls.play();
    }
  }, [isAduioPlaying]);

  return (
    <div className={styles.headphone}>
      {audio}
      <div className={styles.line}>
        <div className={styles.l}>Speaker :</div>
        <Select
          defaultValue={zegoStore.speakerCurrentID}
          style={{ width: 300 }}
          onChange={handleAudioOutputDeviceChange}
        >
          {speakerList.map(item => {
            return (
              <Select.Option key={item.deviceID} value={item.deviceID}>
                {item.deviceName}
              </Select.Option>
            );
          })}
        </Select>
      </div>
      <div className={styles.headphone_preview}>
        <img
          onClick={toggleAudioPlayer}
          src={isAduioPlaying ? iconSoundStopImg : iconSoundStartImg}
        />
        <div className={styles.label}>
          <div className={styles.title}>
            {isAduioPlaying ? 'Playing' : 'Play'}
          </div>
          <div className={styles.desc}>
            Click the play button to hear the sound
          </div>
        </div>
      </div>
      <div className={styles.control_bottom}>
        <Button type="primary" onClick={() => nextStep()}>
          Able to hear
        </Button>
        <Button onClick={() => nextStep()}>Unable to hear</Button>
      </div>
    </div>
  );
};

export default HeadphoneItem;
