import { Component } from 'react';
import { Button, Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import DocumentTitle from 'react-document-title';
import { RouteComponentProps } from 'react-router-dom';
import AppStore from 'store/stores/AppStore';
import UserStore from 'store/stores/UserStore';
import { ReactComponent as SenticSvg } from 'assets/svgs/Sentic.svg';
import styles from './style.module.less';

interface IBasicLayoutProps extends RouteComponentProps {
  title?: string;
  loading?: boolean;
  appStore?: AppStore;
  userStore?: UserStore;
}

interface IBasicLayoutState {
  [key: string]: any;
}

const { Header, Content } = Layout;

@inject('appStore', 'userStore')
@observer
export default class BasicLayout extends Component<
  IBasicLayoutProps,
  IBasicLayoutState
> {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { userStore, appStore } = this.props;
    return (
      <DocumentTitle title="系统">
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
            {this.props.children}
            <SenticSvg className={styles['ant-menu']} />
          </Content>
        </Layout>
      </DocumentTitle>
    );
  }
}
