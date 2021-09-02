import { action, makeObservable, observable } from 'mobx';
import { sleep } from 'utils/tool';

export interface IMenus {
  id?: number | string;
  name?: string;
  menuUri?: string;
  icon?: string;
  menuLevel?: number;
  children?: IMenus[] | null;
}

// 全局的store
export default class AppStore {
  public _loading = false;
  public _currentItem: IMenus[] = [];
  constructor() {
    makeObservable(this, {
      _loading: observable,
      _currentItem: observable,
      setCurrentItem: action.bound,
    });
  }
  async setCurrentItem(val: IMenus): Promise<any> {
    await sleep(1000);
    this._currentItem.push(val);
  }
}
