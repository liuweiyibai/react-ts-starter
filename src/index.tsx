import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN'; // 引入中文包
import { Provider } from 'mobx-react';
import ReactDOM from 'react-dom';
import { stores } from './store/hooks';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'styles/reset.less';

const bootstrap = () => {
  /* eslint-disable react/no-render-return-value */
  return ReactDOM.render(
    <ConfigProvider locale={zhCN}>
      <Provider {...stores}>
        {/* <StoreProvider> */}
        <App />
        {/* </StoreProvider> */}
      </Provider>
    </ConfigProvider>,
    document.getElementById('root'),
  );
};

bootstrap();
reportWebVitals();
