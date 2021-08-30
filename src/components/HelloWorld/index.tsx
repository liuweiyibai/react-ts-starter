import { useEffect } from 'react';
import { Button } from 'antd';
import { handleClick } from 'utils/tool';
import { userLogin, getMe } from 'api';
import styles from './index.module.less';

const HelloWorld = () => {
  useEffect(() => {
    const postUserLogin = async () => {
      const resp = await userLogin({});
      const resp2 = await getMe();
      console.log(resp, resp2);
    };

    postUserLogin();
  }, []);
  return (
    <div className={styles.home}>
      <Button type="primary" onClick={handleClick}>
        点击
      </Button>
      hello world fdsfkldskfl;
    </div>
  );
};

export default HelloWorld;
