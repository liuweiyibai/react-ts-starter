import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as CalendarIcon } from 'assets/svgs/calendar.svg';
import AppSiderBottom from './AppSiderBottom';
import styles from './style.module.less';

function AppSider() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleChangeRoute = () => {
    navigate('/calendar');
  };
  return (
    <div className={styles.app_sider}>
      <div className={styles.sider_top}>
        <div
          className={`${styles.menu_item} ${
            pathname === '/calendar' ? styles.current : ''
          }`}
          onClick={handleChangeRoute}
        >
          <CalendarIcon />
        </div>
      </div>
      <AppSiderBottom />
    </div>
  );
}

export default AppSider;
