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
