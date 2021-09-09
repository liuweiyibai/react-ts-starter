import { FC, useEffect } from 'react';
import { Button } from 'antd';
import styles from './style.module.less';
import { getOsName, getNetwork } from 'utils/tool';
import { BasicProps } from './interface';

const SystemItem: FC<BasicProps> = ({ nextStep }) => {
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div className={styles.system}>
      <div className={styles.line}>
        <div className={styles.l}>Nickname :</div>
        <div className={styles.r}>刘威</div>
      </div>
      <div className={styles.line}>
        <div className={styles.l}>Account :</div>
        <div className={styles.r}>3adcf8d5</div>
      </div>
      <br />
      <div className={styles.line}>
        <div className={styles.l}>OS :</div>
        <div className={styles.r}>{getOsName()}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.l}>CPU :</div>
        <div className={styles.r}>Intel(R) Core(TM) i5-8257U CPU @ 1.40GHz</div>
      </div>
      <div className={styles.line}>
        <div className={styles.l}>Connect Cost :</div>
        <div className={styles.r}>{getNetwork()}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.l}>Network Delay :</div>
        <div className={styles.r}>
          checking...
          {/* {this.rtt.value === null ? 'checking...' : `${this.rtt.value} ms`} */}
        </div>
      </div>
      <div className={styles.line}>
        <div className={styles.l}>Lost Rate :</div>
        <div className={styles.r}>
          checking...
          {/* {this.pktLostRate.value === null
            ? 'checking...'
            : `${this.pktLostRate.value} %`} */}
        </div>
      </div>
      <div className={styles.control_bottom}>
        <Button type="primary" onClick={() => nextStep('Camera')}>
          下一步
        </Button>
      </div>
    </div>
  );
};

export default SystemItem;
