import React, { useState, FC, lazy, Suspense } from 'react';
import { Menu, Modal, Spin } from 'antd';
import type { SelectInfo } from 'rc-menu/lib/interface';
import styles from './style.module.less';
import { ReactComponent as SystemActSvg } from 'assets/svgs/SystemAct.svg';
import { ReactComponent as SystemNorSvg } from 'assets/svgs/SystemNor.svg';
import { ReactComponent as CameraActSvg } from 'assets/svgs/CameraAct.svg';
import { ReactComponent as CameraNarSvg } from 'assets/svgs/CameraNor.svg';
import { ReactComponent as HeadphoneActSvg } from 'assets/svgs/HeadphoneAct.svg';
import { ReactComponent as HeadphoneNarSvg } from 'assets/svgs/HeadphoneNor.svg';
import { ReactComponent as MicrophoneActSvg } from 'assets/svgs/MicrophoneAct.svg';
import { ReactComponent as MicrophoneNarSvg } from 'assets/svgs/MicrophoneNor.svg';
import { useDevices } from 'hooks';

const SystemItem = lazy(() => import('./SystemItem'));
const CameraItem = lazy(() => import('./CameraItem'));
const HeadphoneItem = lazy(() => import('./HeadphoneItem'));
const MicrophoneItem = lazy(() => import('./MicrophoneItem'));

const MENU_ITEMS = [
  {
    value: 'System',
    text: '系统信息',
    className: 'default',
    icon: SystemNorSvg,
    activeIcon: SystemActSvg,
  },
  {
    value: 'Camera',
    text: '摄像头',
    className: 'default',
    icon: CameraNarSvg,
    activeIcon: CameraActSvg,
  },
  {
    value: 'Headphone',
    text: '耳机',
    className: 'default',
    icon: HeadphoneNarSvg,
    activeIcon: HeadphoneActSvg,
  },
  {
    value: 'Microphone',
    text: '麦克风',
    className: 'default',
    icon: MicrophoneNarSvg,
    activeIcon: MicrophoneActSvg,
  },
];

const MenuContents = [
  {
    value: 'System',
    Component: SystemItem,
  },
  {
    value: 'Camera',
    Component: CameraItem,
  },
  {
    value: 'Headphone',
    Component: HeadphoneItem,
  },
  {
    value: 'Microphone',
    Component: MicrophoneItem,
  },
];

interface PropsAppDetection {
  onClose: () => void;
}

const AppDetection: FC<PropsAppDetection> = ({ onClose }) => {
  const [currentMenuKey, setCurrentMenuKey] = useState('System');

  useDevices();

  const handleMenuSelect = (info: SelectInfo) => {
    const { key } = info;
    setCurrentMenuKey(key);
  };

  const nextStep = (key: string) => {
    setCurrentMenuKey(key);
  };

  const renderContent = (): React.ReactNode | null => {
    const Item = MenuContents.find(t => t.value === currentMenuKey);
    return Item ? <Item.Component nextStep={nextStep} /> : null;
  };

  return (
    <Modal
      title="系统检测"
      footer={null}
      visible={true}
      onCancel={onClose}
      width={680}
      bodyStyle={{ padding: 0 }}
    >
      <div className={styles.modal_container}>
        <div className={styles.modal_menu}>
          <Menu
            selectable={true}
            selectedKeys={[currentMenuKey]}
            mode="inline"
            onSelect={handleMenuSelect}
            inlineIndent={16}
          >
            {MENU_ITEMS.map(item => {
              return (
                <Menu.Item
                  key={item.value}
                  icon={
                    currentMenuKey === item.value ? (
                      <item.activeIcon className={`icon ${styles.icon}`} />
                    ) : (
                      <item.icon className={`icon ${styles.icon}`} />
                    )
                  }
                >
                  <span className={item.className}>{item.text}</span>
                </Menu.Item>
              );
            })}
          </Menu>
        </div>
        <div className={styles.modal_content}>
          <Suspense fallback={<Spin />}>{renderContent()}</Suspense>
        </div>
      </div>
    </Modal>
  );
};

export default AppDetection;
