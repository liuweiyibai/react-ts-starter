import { FC, useState, useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';
import { RouteProps } from 'react-router';
import { useStores } from 'store/hooks';

const ResultRedirect = () => {
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    let i = 5;
    const timer = setInterval(() => {
      setSeconds(--i);
      if (i === 0) {
        clearInterval(timer);
        navigate(`/login${'?from=' + encodeURIComponent(location.pathname)}`, {
          replace: true,
        });
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Result
      status="403"
      title="403"
      subTitle="gloabal.tips.unauthorized"
      extra={
        <Button
          type="primary"
          onClick={() =>
            navigate(
              `/login${'?from=' + encodeURIComponent(location.pathname)}`,
              { replace: true },
            )
          }
        >
          {seconds}后退出登录，您也可以点击返回gloabal.tips.goToLogin
        </Button>
      }
    />
  );
};

const PrivateRoute: FC<RouteProps> = props => {
  const { hasToken, hasUserInfo, setUserAction } = useStores('userStore');
  const navigate = useNavigate();
  useEffect(() => {
    console.log('====================================');
    console.log('private route');
    console.log('====================================');
    if (!hasToken) {
      navigate('/login');
    } else {
      if (!hasUserInfo) {
        setUserAction();
      }
    }
  }, []);

  return hasToken ? <Route {...props} /> : <ResultRedirect />;
};

export default PrivateRoute;
