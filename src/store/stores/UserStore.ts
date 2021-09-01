import { makeObservable, observable, action, computed } from 'mobx';
import { sleep } from 'utils/tool';

export interface TypeUserInfo {
  [key: string]: any;
}

const appToken = sessionStorage.getItem('token');
export default class UserStore {
  public token = appToken;
  public userInfo: TypeUserInfo = {};
  public loginLoading = false;

  constructor() {
    makeObservable(this, {
      token: observable,
      loginLoading: observable,
      userInfo: observable,
      isLogin: computed,
      loginAction: action.bound,
      loginOutAction: action.bound,
    });
  }

  get isLogin(): boolean {
    return !!this.token;
  }

  async loginAction() {
    this.loginLoading = true;
    await sleep(2000);
    const token = String(new Date());
    this.token = token;
    sessionStorage.setItem('token', token);
  }

  public loginOutAction() {
    sessionStorage.setItem('token', '');
    window.location.reload();
  }
}
