import { ReactComponent as CalendarIcon } from 'assets/svgs/calendar.svg';
import AppSiderBottom from './AppSiderBottom';
import styles from './style.module.less';

function AppSider() {
  return (
    <div className={styles.app_sider}>
      <div className={styles.sider_top}>
        <div className={`${styles.menu_item} ${styles.current}`}>
          <CalendarIcon />
        </div>
      </div>
      <AppSiderBottom />
    </div>
  );
}

export default AppSider;
