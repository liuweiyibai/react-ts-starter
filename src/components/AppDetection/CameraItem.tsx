import { FC, useRef } from 'react';
import { Button, Select } from 'antd';
import styles from './style.module.less';

const cameraList: any[] = [];

const CameraItem: FC = () => {
  const handleVideoDeviceChange = () => {};

  const nextStep = () => {};

  const zegoStore = { cameraCurrentID: '' };

  const canvasPreviewRef = useRef(null!);
  return (
    <div className={styles.camera}>
      <div className={styles.line}>
        <div className={styles.l}>Camera :</div>
        <Select
          defaultValue={zegoStore.cameraCurrentID}
          style={{ width: 300 }}
          onChange={handleVideoDeviceChange}
        >
          {cameraList.map(item => {
            return (
              <Select.Option key={item.deviceID} value={item.deviceID}>
                {item.deviceName}
              </Select.Option>
            );
          })}
        </Select>
      </div>
      <div className={styles.video_preview}>
        <canvas ref={canvasPreviewRef.current} />
      </div>
      <div className={styles.control_bottom}>
        <Button type="primary" onClick={() => nextStep()}>
          Able to view
        </Button>
        <Button onClick={() => nextStep()}>Unable to view</Button>
      </div>
    </div>
  );
};

export default CameraItem;
