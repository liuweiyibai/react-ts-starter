import { useEffect } from 'react';
import { isEmpty } from 'lodash-es';
import { useStores } from 'store/hooks';

/**
 * 判断 store 中是否存在设备列表，不存在则重新获取
 */
export const useDevices = (): {
  getDevicesAction?: () => Promise<void>;
} => {
  const { deviceInfo, getDevicesAction } = useStores('appStore');
  useEffect(() => {
    if (isEmpty(deviceInfo)) {
      getDevicesAction();
    }
  }, []);
  return {
    getDevicesAction,
  };
};
