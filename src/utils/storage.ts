import { isPlainObject, isArray } from 'lodash-es';

// 封装操作localStorage本地储存的方法
const storage = {
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key: string) {
    const res = localStorage.getItem(key);
    return res ? JSON.parse(res) : res;
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
};

const session = {
  set(key: string, value: any) {
    const _value =
      isPlainObject(value) || isArray(value) ? JSON.stringify(value) : value;
    sessionStorage.setItem(key, _value);
  },
  get(key: string) {
    const res = sessionStorage.getItem(key);
    try {
      if (res) {
        return JSON.parse(res);
      }
      return res;
    } catch (error) {
      return res;
    }
  },
  remove(key: string) {
    sessionStorage.removeItem(key);
  },
};
const cookie = {};

export { storage, session, cookie };
