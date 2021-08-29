import { Button } from 'antd';
import { handleClick } from 'utils/tool';
import styles from './index.module.less';

const HelloWorld = () => {
  return (
    <div className={styles.home}>
      <Button type='primary' onClick={handleClick}>
        点击
      </Button>
      hello world fdsfkldskfl;
    </div>
  );
};

export default HelloWorld;
