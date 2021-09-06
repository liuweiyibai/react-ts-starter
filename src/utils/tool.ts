import moment from 'moment';

export const handleClick = () => {
  alert(1);
};

export const sleep = (mill: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, mill);
  });
};

export const formatSearch = (_se: string) => {
  let se = decodeURIComponent(_se);
  se = se.substr(1); // 从起始索引号提取字符串中指定数目的字符
  let arr = se.split('&'); // 把字符串分割为字符串数组
  let obj: Record<string, string> = {};
  let newarr = [];
  arr.forEach((v, i) => {
    // 数组遍历
    console.log(v);
    console.log(i);
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

export const getOsInfo = () => {
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
