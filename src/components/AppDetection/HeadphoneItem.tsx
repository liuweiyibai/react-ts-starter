import { Button, Select } from 'antd';
import { FC, useState, useEffect } from 'react';
import { useAudio } from 'react-use';

import { useStores } from 'store/hooks';
import { setOutAudioDevices } from 'utils/device';

import iconSoundStopImg from 'assets/images/stop-sound.png';
import iconSoundStartImg from 'assets/images/start-sound.png';
import soundSrc from 'assets/sounds/demo-sound.ogg';

import styles from './style.module.less';

import { BasicProps } from './interface';

const HeadphoneItem: FC<BasicProps> = ({ nextStep }) => {
  const [isAduioPlaying, setIsAduioPlaying] = useState(false);
  const { deviceInfo, speakerCurrentID, changeSpeakerCurrentIDAction } =
    useStores('appStore');

  const [Audio, , controls, audioRef] = useAudio({
    src: soundSrc,
    autoPlay: false,
  });

  const handleAudioOutputDeviceChange = (deviceID: string) => {
    changeSpeakerCurrentIDAction(deviceID);
    setOutAudioDevices(audioRef.current, deviceID);
    controls.play();
  };

  const toggleAudioPlayer = () => {
    setIsAduioPlaying(!isAduioPlaying);
    if (isAduioPlaying) {
      controls.pause();
    } else {
      controls.play();
    }
  };

  useEffect(() => {
    return () => {
      controls.pause();
    };
  }, []);

  return (
    <div className={styles.headphone}>
      {Audio}
      <div className={styles.line}>
        <div className={styles.l}>Speaker :</div>
        <Select
          value={speakerCurrentID}
          style={{ width: 330 }}
          onChange={handleAudioOutputDeviceChange}
        >
          {deviceInfo?.speakers.map(item => {
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
        <Button type="primary" onClick={() => nextStep('Microphone')}>
          下一步
        </Button>
        <Button onClick={() => handleAudioOutputDeviceChange(speakerCurrentID)}>
          重试
        </Button>
      </div>
    </div>
  );
};

export default HeadphoneItem;
