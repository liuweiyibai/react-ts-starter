import { makeObservable, observable, action } from 'mobx';
export default class UserStore {
  public loading = false;
  public loginSuccess = false;
  constructor() {
    makeObservable(this, {
      loading: observable,
      loginSuccess: observable,
      loginAction: action,
      loginOutAction: action,
    });
  }

  public loginAction(): Promise<number> {
    this.loading = true;
    return new Promise(resolve => {
      setTimeout(() => {
        this.loginSuccess = true;
        this.loading = false;
        sessionStorage.setItem('token', 'logingedddd');
        resolve(1);
      }, 1000);
    });
  }

  public loginOutAction() {
    this.loginSuccess = false;
    sessionStorage.setItem('token', '');
    window.location.reload();
  }
}
