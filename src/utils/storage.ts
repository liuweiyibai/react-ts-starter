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

const session = {};
const cookie = {};

export { storage, session, cookie };
