import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Popconfirm, Tooltip } from 'antd';
import { ReactComponent as TestClassRoomSvg } from 'assets/svgs/testClassRoom.svg';
import { ReactComponent as SystemSvg } from 'assets/svgs/system.svg';
import { ReactComponent as LogoutSvg } from 'assets/svgs/logout.svg';
import { useStores } from 'store/hooks';

const AppSiderBottom: FC = () => {
  const { userInfo, loginOutAction } = useStores('userStore');
  const { toggleVisibleAppDetection } = useStores('appStore');
  const avatarUrl = `https://s1-imfile.feishucdn.com/static-resource/v1/0ce1fbe2-46b0-49d5-b0f4-7de03ac969dg~?image_size=72x72&amp;cut_type=&amp;quality=&amp;format=image&amp;sticker_format=.webp`;

  const handleLogOut = () => {
    loginOutAction();
    window.location.reload();
  };

  return (
    <div className="bottom-select-wrp">
      <Tooltip
        title={userInfo?.userName}
        color="#535354"
        mouseEnterDelay={1}
        placement="right"
        overlayClassName="toolkit-tips"
      >
        <div className="head-img-box">
          <div className="head-img">
            <img src={avatarUrl} alt="" />
          </div>
        </div>
      </Tooltip>
      <Tooltip
        title="Test Room"
        color="#535354"
        mouseEnterDelay={1}
        placement="right"
        overlayClassName="toolkit-tips"
      >
        <Link className="menu-item" to="/live/room/main/window/test">
          <TestClassRoomSvg />
        </Link>
      </Tooltip>
      <Tooltip
        title="System Detect"
        color="#535354"
        mouseEnterDelay={1}
        placement="right"
        overlayClassName="toolkit-tips"
      >
        <div className="menu-item" onClick={toggleVisibleAppDetection}>
          <SystemSvg />
        </div>
      </Tooltip>
      <Popconfirm
        placement="right"
        title="退出登录？"
        okText="确定"
        cancelText="取消"
        onConfirm={handleLogOut}
      >
        <div className="menu-item">
          <LogoutSvg name="iconicon_nav_logout" />
        </div>
      </Popconfirm>
    </div>
  );
};

export default AppSiderBottom;

// title="Logout"
// color="#535354"
// mouseEnterDelay={1}
// placement="right"
// overlayClassName="toolkit-tips"
