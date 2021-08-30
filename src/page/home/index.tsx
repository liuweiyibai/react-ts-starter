import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useStores } from 'store/hooks';

interface Props extends RouteComponentProps {
  a: string;
}

// 登录系统进入的首页
const Home: FC<Props> = (props): JSX.Element => {
  const { appStore } = useStores();
  return (
    <div style={{ textAlign: 'center', paddingTop: 30, fontSize: 24 }}>
      欢迎使用系统
      <div>{appStore._loading ? 'hh' : '呵呵'}</div>
      <div>
        {appStore._currentItem.map(t => (
          <h2 key={t.name}>{t.name}</h2>
        ))}
      </div>
      <button
        onClick={() => {
          appStore._loading = !appStore._loading;
        }}
      >
        更新状态
      </button>
    </div>
  );
};

export default observer(Home);
