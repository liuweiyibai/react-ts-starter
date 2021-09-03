import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import { ReactComponent as TestClassRoomSvg } from 'assets/svgs/testClassRoom.svg';
import { ReactComponent as SystemSvg } from 'assets/svgs/system.svg';
import { ReactComponent as LogoutSvg } from 'assets/svgs/logout.svg';
import { useStores } from 'store/hooks';

const AppSiderBottom: FC = () => {
  const { userInfo } = useStores('userStore');
  const avatarUrl = `https://s1-imfile.feishucdn.com/static-resource/v1/0ce1fbe2-46b0-49d5-b0f4-7de03ac969dg~?image_size=72x72&amp;cut_type=&amp;quality=&amp;format=image&amp;sticker_format=.webp`;
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
          <TestClassRoomSvg name="iconicon_nav_temporaryclassrooms" />
        </Link>
      </Tooltip>
      <Tooltip
        title="System Detect"
        color="#535354"
        mouseEnterDelay={1}
        placement="right"
        overlayClassName="toolkit-tips"
      >
        <div
          className="menu-item"
          onClick={() => {
            // this.detectModalVisible = true;
          }}
        >
          <SystemSvg />
        </div>
      </Tooltip>
      <Tooltip
        title="Logout"
        color="#535354"
        mouseEnterDelay={1}
        placement="right"
        overlayClassName="toolkit-tips"
      >
        <div className="menu-item">
          <LogoutSvg name="iconicon_nav_logout" />
        </div>
      </Tooltip>
    </div>
  );
};

export default AppSiderBottom;
