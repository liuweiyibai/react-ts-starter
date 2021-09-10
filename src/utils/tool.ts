import moment from 'moment';
import { get } from 'lodash-es';
import type {
  ZegoDeviceInfos,
  ZegoDeviceInfo,
} from 'zego-express-engine-webrtc/sdk/code/zh/ZegoExpressEntity.web';

/**
 * 睡眠函数
 * @param mill
 * @returns
 */
export const sleep = (mill: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, mill);
  });
};

/**
 * 获取url
 * @param _se
 * @returns
 */
export const formatSearch = (_se: string) => {
  let se = decodeURIComponent(_se);
  se = se.substr(1); // 从起始索引号提取字符串中指定数目的字符
  let arr = se.split('&'); // 把字符串分割为字符串数组
  let obj: Record<string, string> = {};
  let newarr = [];
  arr.forEach((v, i) => {
    // 数组遍历
    newarr = v.split('=');
    if (typeof obj[newarr[0]] === 'undefined') {
      obj[newarr[0]] = newarr[1];
    }
  });
  return obj;
};

const getTimeFromMins = (mins: number) => {
  const h = (mins / 60) | 0;
  const m = mins % 60 | 0;
  return moment.utc().hours(h).minutes(m).format('HH:mm');
};

export const getTimeZone = () => {
  let timeZone: string | number = new Date().getTimezoneOffset();

  if (timeZone > 0) {
    timeZone = '-' + getTimeFromMins(timeZone);
  } else {
    timeZone = '+' + getTimeFromMins(-timeZone);
  }
  return timeZone;
};

export const getOsName = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  let name = 'Unknown';
  if (userAgent.indexOf('win') > -1) {
    name = 'Windows';
  } else if (userAgent.indexOf('iphone') > -1) {
    name = 'iPhone';
  } else if (userAgent.indexOf('mac') > -1) {
    name = 'Mac';
  } else if (
    userAgent.indexOf('x11') > -1 ||
    userAgent.indexOf('unix') > -1 ||
    userAgent.indexOf('sunname') > -1 ||
    userAgent.indexOf('bsd') > -1
  ) {
    name = 'Unix';
  } else if (userAgent.indexOf('linux') > -1) {
    if (userAgent.indexOf('android') > -1) {
      name = 'Android';
    } else {
      name = 'Linux';
    }
  } else {
    name = 'Unknown';
  }
  return name;
};

export const getNetwork = () => {
  return get(navigator, 'connection.effectiveType', '-');
};

export const processChatBoxLinks = (str: string, id: string) => {
  const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-|%)+)/g;

  if (reg.test(str)) {
    return str.replace(
      reg,
      `<a href="$1$2" id="${id}" target="_blank">$1$2</a>`,
    );
  }
  return str;
};

// 删除一组设备中的带有 “默认” 字样的设备
const deleteDefaultDevice = (ds: ZegoDeviceInfo[]) => {
  const index = ds.findIndex(t => t.deviceName.indexOf('默认') > -1);
  if (index >= 0) {
    const device = ds[index];
    const name = device.deviceName.replaceAll('默认 - ', '');
    ds.splice(index, 1);
    const sameNameDeviceIndex = ds.findIndex(t => t.deviceName === name);
    if (sameNameDeviceIndex >= 0) {
      [ds[0], ds[sameNameDeviceIndex]] = [ds[sameNameDeviceIndex], ds[0]];
    } else {
      return ds;
    }
  }
  return ds;
};

/**
 * 删除设备列表中的默认设备
 */
export const compSystemDeviceList = (devices: ZegoDeviceInfos) => {
  devices.cameras = deleteDefaultDevice(devices.cameras);
  devices.microphones = deleteDefaultDevice(devices.microphones);
  devices.speakers = deleteDefaultDevice(devices.speakers);
};
