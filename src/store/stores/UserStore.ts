import { makeObservable, observable, action, computed } from 'mobx';
import { sleep } from 'utils/tool';
import { userLogin } from 'api';
import { session } from 'utils/storage';
import { TOKEN } from 'utils/var';

export interface TypeUserInfo {
  [key: string]: any;
}

const appToken = session.get(TOKEN);
export default class UserStore {
  public token = appToken;
  public userInfo: TypeUserInfo = {};
  public loginLoading = false;

  constructor() {
    makeObservable(this, {
      token: observable,
      loginLoading: observable,
      userInfo: observable,
      hasToken: computed,
      hasUserInfo: computed,
      loginAction: action.bound,
      loginOutAction: action.bound,
      setUserAction: action.bound,
    });
  }

  get hasToken(): boolean {
    return !!this.token;
  }

  get hasUserInfo(): boolean {
    return this.userInfo?.id;
  }

  async loginAction(params: any) {
    this.loginLoading = true;
    const resp = await userLogin(params);
    if (resp.code === 200) {
      const token = resp.data as string;
      this.token = token;
      session.set(TOKEN, token);
      this.loginLoading = false;
      return true;
    }
  }
  async setUserAction() {
    sleep(300);
    // 调用接口
    const userInfo: TypeUserInfo = { id: '44324' };
    this.userInfo = userInfo;
    return false;
  }

  public loginOutAction() {
    session.remove(TOKEN);
    this.token = '';
  }
}
