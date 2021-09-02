import { Spin } from 'antd';
import styles from './style.module.less';

function PageLoading() {
  return (
    <div className={styles.flex}>
      <Spin size="large" />
    </div>
  );
}

export default PageLoading;
