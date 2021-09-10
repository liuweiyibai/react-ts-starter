import { FC } from 'react';
import { Route } from 'react-router-dom';
import { RouteProps } from 'react-router';
import PrivateRoute from './pravateRoute';

export interface WrapperRouteProps extends RouteProps {
  // page 组件对应的 document title
  title: string;
  // 传入组件是否需要登录
  auth?: boolean;
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({
  title,
  auth,
  ...props
}) => {
  const WitchRoute = auth ? PrivateRoute : Route;
  if (title) {
    document.title = title;
  }
  return <WitchRoute {...props} />;
};

export default WrapperRouteComponent;
