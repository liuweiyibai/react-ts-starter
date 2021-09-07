import React from 'react';

function Users() {
  return (
    <div className="member-container">
      {/* {Array.from(this.membersMap.values()).map(user => {
        return (
          <div className="member-item" key={user.userID}>
            <img src={iconStudent} />
            <div className={user.online ? 'online-name' : 'offline-name'}>
              {user.userName}
            </div>
          </div>
        );
      })} */}
    </div>
  );
}

export default Users;
