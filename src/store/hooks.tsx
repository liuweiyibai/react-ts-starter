import { createContext, FC, useContext } from 'react';
import { useLocalObservable } from 'mobx-react';
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

// Context的封装,创建 Provider，通过 React.Context来注入,包裹函数组件,将hookStores注入到函数组件中
const StoresContext = createContext(stores);

const useStores = () => useContext(StoresContext); // hooks组件使用的store

type TypeStore = ReturnType<typeof createStores>;
const StoreContext = createContext<TypeStore | null>(null);

// 创建 Provider，通过 React.Context 来注入
const StoreProvider: FC = ({ children }) => {
  // 函数组件中hooks使用的store
  const hookStores = useLocalObservable(createStores);
  return (
    <StoreContext.Provider value={hookStores}>{children}</StoreContext.Provider>
  );
};

export { stores, StoreProvider, useStores };
