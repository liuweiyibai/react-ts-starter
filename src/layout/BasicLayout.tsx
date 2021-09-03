import { Component, Suspense } from 'react';
import { Button, Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import { Outlet, NavigateFunction } from 'react-router-dom';
import AppStore from 'store/stores/AppStore';
import UserStore from 'store/stores/UserStore';
import { ReactComponent as SenticSvg } from 'assets/svgs/Sentic.svg';
import withNavigate from 'utils/withNavigate';
import AppSider from 'components/AppSider';
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

const { Content, Sider } = Layout;

@inject('appStore', 'userStore')
@observer
class BasicLayout extends Component<IBasicLayoutProps, IBasicLayoutState> {
  // componentDidMount() {
  //   console.log(this.props);
  // }

  render() {
    // const { userStore, appStore, navigate } = this.props;
    return (
      <Layout>
        <Sider width={72}>
          <AppSider />
        </Sider>
        <Content>
          {/* <Suspense fallback={<PageLoading />}> */}
          <Outlet />
          {/* </Suspense> */}
        </Content>
      </Layout>
    );
  }
}
export default withNavigate<IBasicLayoutProps>(BasicLayout);
