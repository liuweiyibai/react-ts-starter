import { Button, Checkbox, Form, Input } from 'antd';
import { observer } from 'mobx-react';
import { FC, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Location } from 'history';
import { useStores } from 'store/hooks';
import { formatSearch } from 'utils/tool';

import styles from './style.module.less';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// 登录页面
const Login: FC = () => {
  const { loginLoading, hasToken, loginAction } = useStores('userStore');
  const navigate = useNavigate();
  const location = useLocation() as Location<{ from: string }>;
  const onFinish = async (values: any) => {
    const resp = await loginAction(values);
    if (resp) {
      const search = formatSearch(location.search);
      const from = search?.from || { pathname: '/' };
      navigate(from);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    // 登录了之后要跳转到home页面
    const token: string | null = sessionStorage.getItem('token');
    if (hasToken || (token && token.length > 0)) {
      const search = formatSearch(location.search);
      const from = search?.from || { pathname: '/' };
      navigate(from);
    }
    return () => {};
  }, []);
  return (
    <div className={styles.login_page}>
      <iframe
        src="https://api.lumiclass.com/admin/teachLogin"
        frameBorder="0"
        allow="*"
      />
      <div className={styles.fixed}>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>记住登录</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={loginLoading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default observer(Login);
