import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN'; // 引入中文包
import { Provider } from 'mobx-react';
import ReactDOM from 'react-dom';
import { stores } from './store/hooks';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'styles/reset.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const bootstrap = () => {
  /* eslint-disable react/no-render-return-value */
  return ReactDOM.render(
    <ConfigProvider locale={zhCN}>
      <Provider {...stores}>
        <App />
      </Provider>
    </ConfigProvider>,
    document.getElementById('root'),
  );
};

bootstrap();
reportWebVitals();
