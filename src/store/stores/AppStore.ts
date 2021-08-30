import { makeAutoObservable } from 'mobx';

export interface IMenus {
  id?: number | string;
  name?: string;
  menuUri?: string;
  icon?: string;
  menuLevel?: number;
  children?: IMenus[] | null;
}

/* eslint-disable */
const sleep = (timer = 1000) =>
  new Promise(resolve => setTimeout(resolve, timer));

//全局的store
export default class AppStore {
  public _loading: boolean = false;
  public _currentItem: IMenus[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  async setCurrentItem(val: IMenus): Promise<any> {
    await sleep(1000);
    this._currentItem.push(val);
  }
}
