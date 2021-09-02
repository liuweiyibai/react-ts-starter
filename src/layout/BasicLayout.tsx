import { Component, Suspense } from 'react';
import { Button, Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import { Outlet, NavigateFunction } from 'react-router-dom';
import AppStore from 'store/stores/AppStore';
import UserStore from 'store/stores/UserStore';
import { ReactComponent as SenticSvg } from 'assets/svgs/Sentic.svg';
import withNavigate from 'utils/withNavigate';
import PageLoading from 'components/PageLoading';
import styles from './style.module.less';

interface IBasicLayoutProps {
  title?: string;
  loading?: boolean;
  appStore?: AppStore;
  userStore?: UserStore;
  navigate?: NavigateFunction;
}

interface IBasicLayoutState {
  [key: string]: any;
}

const { Header, Content } = Layout;

@inject('appStore', 'userStore')
@observer
class BasicLayout extends Component<IBasicLayoutProps, IBasicLayoutState> {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { userStore, appStore, navigate } = this.props;
    return (
      <Layout>
        <Header className={styles.header}>
          <div>
            {appStore?._currentItem.map(t => (
              <h2 key={t.name}>{t.name}</h2>
            ))}
          </div>
          <Button
            onClick={() => {
              userStore?.loginOutAction();
              navigate?.('/login');
            }}
          >
            退出
          </Button>

          <Button
            onClick={() =>
              appStore?.setCurrentItem({ name: String(new Date()) })
            }
          >
            菜单列表
          </Button>
        </Header>

        <Content className={styles.main} id="mainContainer">
          <Suspense fallback={<PageLoading />}>
            <Outlet />
          </Suspense>
          <SenticSvg className={styles['ant-menu']} />
        </Content>
      </Layout>
    );
  }
}
export default withNavigate<IBasicLayoutProps>(BasicLayout);
