import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';
import AppStore from './stores/AppStore';
import UserStore from './stores/UserStore';

// 生成 store 的统一方法
const createStores = () => {
  // 新增加一个store,在此创建一个实例即可
  return {
    appStore: new AppStore(),
    userStore: new UserStore(),
  };
};

// 类组件使用的store
const stores = createStores();

export type StoreType = ReturnType<typeof createStores>;

// 这两个是函数声明，重载
// 可能会直接返回整个store
function useStores(): StoreType;
// 可能会传入子store，获取具体的某个子store
function useStores<T extends keyof StoreType>(storeName: T): StoreType[T];

/**
 * 获取根 store 或者指定 store 名称数据，使用普通函数导致store 类中 this 丢失，可以添加bound或者改为箭头函数
 * @param storeName 指定子 store 名称
 * @returns typeof StoreType[storeName]
 */
function useStores<T extends keyof StoreType>(storeName?: T) {
  const rootStore = useContext(MobXProviderContext);
  const stores = rootStore as StoreType;
  return storeName ? stores[storeName] : stores;
}

export { stores, useStores };
