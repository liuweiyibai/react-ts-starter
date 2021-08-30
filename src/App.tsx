import { FC } from 'react';
import { observer } from 'mobx-react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import BasicLayout from 'layout/BasicLayout';
import NoMatchPage from 'page/404';
import routers, { IRouterProps } from 'router';
import { useStores } from 'store/hooks';

const App: FC = () => {
  const { userStore } = useStores();
  const { loginSuccess } = userStore;
  const isLogin = loginSuccess || sessionStorage.getItem('token');
  console.log('是否登录==>' + isLogin);

  return (
    <HashRouter>
      <Switch>
        {routers.map((item: IRouterProps, key: number) => {
          return (
            <Route
              key={key}
              exact
              path={item.path}
              render={(props: any) => {
                if (!item.needLogin || isLogin) {
                  if (item.needLogin) {
                    // 需要登录的页面布局
                    return (
                      <BasicLayout {...props}>
                        <item.component {...props} />
                      </BasicLayout>
                    );
                  } else {
                    // 这是不需要登录的页面的布局
                    return <item.component {...props} />;
                  }
                } else {
                  return <Redirect exact to="/login" />;
                }
              }}
            />
          );
        })}
        {/* <Route exact={true} path={'/'} component={Home} /> */}
        {/* <Route path={'/login'} component={Login} /> */}
        <Route component={NoMatchPage} />
      </Switch>
    </HashRouter>
  );
};

export default observer(App);
