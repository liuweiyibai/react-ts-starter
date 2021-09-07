import { FC, useRef, useEffect, useState } from 'react';
import { Button, Select, Spin } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from 'store/hooks';
import styles from './style.module.less';
import { BasicProps } from './interface';
import { sleep } from 'utils/tool';

const CameraItem: FC<BasicProps> = ({ nextStep }) => {
  const { deviceInfo, cameraCurrentID, zgEngine } = useStores('appStore');
  const [spinning, setSpinning] = useState(true);

  const handleVideoDeviceChange = () => {};

  const videoPreviewRef = useRef<HTMLVideoElement>(null!);
  const streamRef = useRef<MediaStream>(null!);

  const played = async () => {
    setSpinning(true);
    if (streamRef.current) {
      zgEngine.destroyStream(streamRef.current);
    }
    streamRef.current = await zgEngine.createStream({
      camera: {
        video: true,
        audio: true,
        width: 418,
        height: 235,
        videoQuality: 4,
        videoInput: cameraCurrentID,
        frameRate: 15,
        bitrate: 300,
      },
    });
    videoPreviewRef.current.srcObject = streamRef.current;
    await sleep(500);
    setSpinning(false);
  };

  useEffect(() => {
    if (cameraCurrentID) {
      played();
    }
    return () => {
      zgEngine.destroyStream(streamRef.current);
    };
  }, []);

  return (
    <div className={styles.camera}>
      <div className={styles.line}>
        <div className={styles.l}>Camera :</div>
        <Select
          defaultValue={cameraCurrentID}
          style={{ width: 300 }}
          onChange={handleVideoDeviceChange}
        >
          {deviceInfo?.cameras.map(item => {
            return (
              <Select.Option key={item.deviceID} value={item.deviceID}>
                {item.deviceName}
              </Select.Option>
            );
          })}
        </Select>
      </div>
      <div className={styles.video_preview}>
        <Spin spinning={spinning}>
          <video ref={videoPreviewRef} autoPlay />
        </Spin>
      </div>
      <div className={styles.control_bottom}>
        <Button type="primary" onClick={() => nextStep('Headphone')}>
          下一步
        </Button>
        <Button onClick={played}>重试</Button>
      </div>
    </div>
  );
};

export default observer(CameraItem);
