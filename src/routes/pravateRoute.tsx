import { FC, useState, useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';
import { RouteProps } from 'react-router';
import { useStores } from 'store/hooks';

const PrivateRoute: FC<RouteProps> = props => {
  const { hasToken, hasUserInfo, setUserAction } = useStores('userStore');
  const navigate = useNavigate();
  useEffect(() => {
    if (!hasToken) {
      navigate('/login');
    } else {
      if (!hasUserInfo) {
        setUserAction();
      }
    }
  }, []);

  return <Route {...props} />;
};

export default PrivateRoute;
