import React, { useEffect } from 'react';
import { useStores } from 'store/hooks';
import styles from './styles/User.module.less';
import iconStudent from '../../assets/images/icon-student.png';

function Users() {
  const { userListMap } = useStores('appStore');

  return (
    <div className={styles['member-container']}>
      {Array.from(userListMap.values()).map(user => {
        return (
          <div className={styles['member-item']} key={user.userID}>
            <img src={iconStudent} />
            <div
              className={
                user.online ? styles['online-name'] : styles['offline-name']
              }
            >
              {user.userName}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Users;
