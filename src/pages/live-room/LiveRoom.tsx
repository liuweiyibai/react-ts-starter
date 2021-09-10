import { FC, useEffect, useState } from 'react';
import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './LiveRoom.module.less';
import ControlBar from 'components/ControlBar';
import ComponentIM from 'components/IM';
import { getCourseInfo, getThirdToken } from 'api';
import { ICourseDataType } from '../../store/stores/interface';
import { useStores } from 'store/hooks';
import { initZgEvents } from 'utils/events';

const LiveRoom: FC = props => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState<ICourseDataType>(null);
  const [zgAuthToken, setZgAuthToken] = useState('');
  const { zgEngine, setStream, setCourseData } = useStores('appStore');

  useEffect(() => {
    getCourseData();
    initZgEvents(zgEngine);
  }, []);

  useEffect(() => {
    getZgAuthToken();
  }, [course]);

  useEffect(() => {
    loginRoom();
  }, [zgAuthToken]);

  const getCourseData = () => {
    getCourseInfo(courseId).then(res => {
      console.log(res);
      if (res.ret === 20000) {
        setCourse(res.result || null);
        setCourseData(res.result || null);
      }
    });
  };

  const getZgAuthToken = () => {
    if (!course?.liveUserId) return;

    getThirdToken(course.liveUserId!).then(res => {
      console.log(res);
      if (res.ret === 20000) {
        setZgAuthToken(res.result);
      }
    });
  };

  const loginRoom = async () => {
    if (!course?.liveRoomId) return;
    // 登录房间，成功则返回 true
    // userUpdate 设置为 true 会开启监听 roomUserUpdate 回调，默认情况下不会开启该监听
    const loginResult = await zgEngine.loginRoom(
      course.liveRoomId!,
      zgAuthToken,
      {
        userID: course.liveUserId!,
        userName: 'test',
      },
      { userUpdate: true },
    );
    console.log(loginResult);

    createCameraStream();
  };

  const createCameraStream = async () => {
    const cameraStream = await zgEngine.createStream({
      camera: { video: true, audio: true },
    });

    setStream('cameraStream', cameraStream);

    const cameraVideo = document.getElementById(
      'camera-video',
    ) as HTMLVideoElement;

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
        <div className={styles.roomId}>ID: {course?.liveRoomId}</div>
        <div className={styles.back}>
          <Button danger type="primary" onClick={() => navigate('/calendar')}>
            退出直播间
          </Button>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles['preview-box']}>
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
