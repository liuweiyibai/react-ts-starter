import { FC, useEffect, useState } from 'react';
import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './LiveRoom.module.less';
import ControlBar from 'components/ControlBar';
import ComponentIM from 'components/IM';
import { getCourseInfo, getThirdToken } from 'api';
import { ICourseData } from './interface';
import { useStores } from 'store/hooks';
import { initZgEvents } from 'utils/events';

const LiveRoom: FC = props => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState<ICourseData>({});
  const [zgAuthToken, setZgAuthToken] = useState('');
  const { zgEngine } = useStores('appStore');
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    getCourseData();
    initZgEvents(zgEngine);
  }, []);

  useEffect(() => {
    getZgAuthToken();
  }, [courseData]);

  useEffect(() => {
    loginRoom();
  }, [zgAuthToken]);

  const getCourseData = () => {
    getCourseInfo(courseId).then(res => {
      console.log(res);
      if (res.ret === 20000) {
        setCourseData(res.result || {});
      }
    });
  };

  const getZgAuthToken = () => {
    if (!courseData.liveUserId) return;

    getThirdToken(courseData.liveUserId!).then(res => {
      console.log(res);
      if (res.ret === 20000) {
        setZgAuthToken(res.result);
      }
    });
  };

  const loginRoom = async () => {
    if (!courseData.liveRoomId) return;
    // 登录房间，成功则返回 true
    // userUpdate 设置为 true 会开启监听 roomUserUpdate 回调，默认情况下不会开启该监听
    const loginResult = await zgEngine.loginRoom(
      courseData.liveRoomId!,
      zgAuthToken,
      {
        userID: courseData.liveUserId!,
        userName: 'test',
      },
      { userUpdate: true },
    );
    console.log(loginResult);

    createCameraStream();
  };

  const createCameraStream = async () => {
    // 调用 createStream 接口后，需要等待 ZEGO 服务器返回流媒体对象才能执行后续操作
    const cameraStream = await zgEngine.createStream({
      camera: { video: true, audio: true },
    });
    setCameraStream(cameraStream);
    // 获取页面的 video 标签
    const cameraVideo = document.getElementById(
      'camera-video',
    ) as HTMLVideoElement;
    // stream 为MediaStream对象，开发者可通过赋值给video或audio的srcObject属性进行渲染
    cameraVideo.srcObject = cameraStream;
  };

  // const playScreenStream = async () => {
  //   zgEngine.createStream();
  // };

  // const playCameraStream = async () => {
  //   zgEngine.createStream();
  // };
  return (
    <div className={styles.liveRoomWrap}>
      <div className={styles.header}>
        <div className={styles.roomId}>ID: {courseData?.liveRoomId}</div>
        <div className={styles.back}>
          <Button danger type="primary" onClick={() => navigate('/calendar')}>
            退出直播间
          </Button>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles['preview-box']}>
            {/* http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4 */}
            <video
              // src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
              src=""
              muted
              autoPlay
              id="preview-video"
            />
          </div>

          <div className={styles.footer}>
            <ControlBar />
          </div>
        </div>

        <div className={styles['right-side']}>
          <div className={styles['camera-box']}>
            <video
              src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
              muted
              autoPlay
              id="camera-video"
            />
          </div>

          <div className={styles['function-box']}>
            <ComponentIM />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveRoom;
