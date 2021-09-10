import { observer } from 'mobx-react';
import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStores } from 'store/hooks';

// 登录系统进入的首页
const Home: FC = (): JSX.Element => {
  const { appStore } = useStores();
  const navigate = useNavigate();
  return (
    <div
      style={{
        textAlign: 'center',
        paddingTop: 30,
        fontSize: 24,
        height: '3000px',
      }}
    >
      欢迎使用系统
      {/* <div>{appStore._loading ? 'hh' : '呵呵'}</div> */}
      <div>
        {/* {appStore._currentItem.map(t => (
          <h2 key={t.name}>{t.name}</h2>
        ))} */}
      </div>
      <button
        onClick={() => {
          // appStore._loading = !appStore._loading;
        }}
      >
        更新状态
      </button>
      <button onClick={() => navigate('/dashboard')}>去dashboard</button>
    </div>
  );
};

export default observer(Home);
