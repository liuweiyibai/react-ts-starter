import { Component } from 'react';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import { Outlet, NavigateFunction } from 'react-router-dom';
import AppStore from 'store/stores/AppStore';
import UserStore from 'store/stores/UserStore';
import withNavigate from 'utils/withNavigate';
import AppSider from 'components/AppSider';
import AppDetection from 'components/AppDetection';

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
    const { appStore } = this.props;
    return (
      <>
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
        {/* {appStore?.visibleAppDetection && (
          <AppDetection onClose={() => appStore?.toggleVisibleAppDetection()} />
        )} */}
      </>
    );
  }
}
export default withNavigate<IBasicLayoutProps>(BasicLayout);
