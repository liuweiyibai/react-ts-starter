import { FC, useEffect, useRef, useState } from 'react';
import { Button, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './LiveRoom.module.less';
import ControlBar from 'components/ControlBar';
import ComponentIM from 'components/IM';
import { getCourseInfo, getThirdToken } from 'api';
import { ICourseDataType } from '../../store/stores/interface';
import { useStores } from 'store/hooks';
import { initZgEvents } from 'utils/events';
import { observer } from 'mobx-react';

const LiveRoom: FC = props => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState<ICourseDataType>(null);
  const [zgAuthToken, setZgAuthToken] = useState('');
  const [loading, setLoading] = useState(false);
  const cameraVideoRef = useRef<HTMLVideoElement>(null!);
  const previewVideoRef = useRef<HTMLVideoElement>(null!);
  const {
    zgEngine,
    setStream,
    setCourseData,
    publishingState,
    stopMix,
    stopPublishing,
    createScreenStream,
  } = useStores('appStore');

  useEffect(() => {
    getCourseData();
    initZgEvents(zgEngine);

    return () => {
      if (publishingState) {
        stopMix();
        stopPublishing('screenStream');
        stopPublishing('cameraStream');
      }
      logoutRoom();
    };
  }, []);

  useEffect(() => {
    getZgAuthToken();
  }, [course]);

  useEffect(() => {
    loginRoom();
  }, [zgAuthToken]);

  // 获取课程数据
  const getCourseData = async () => {
    const resp = await getCourseInfo(courseId);
    if (resp.ret === 20000) {
      setCourse(resp.result);
      setCourseData(resp.result);
    }
  };

  // 获取即构鉴权 token
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

  const logoutRoom = () => {
    zgEngine.logoutRoom(course?.liveRoomId);
  };

  const createCameraStream = async () => {
    // TODO audio false
    const cameraStream = await zgEngine.createStream({
      camera: { video: true, audio: true },
    });

    setStream('cameraStream', cameraStream);

    cameraStream.getTracks().forEach(track => {
      track.addEventListener('ended', () => {
        // 可以监听到退出屏幕共享被关闭
      });
    });
    cameraVideoRef.current.srcObject = cameraStream;
  };

  const onQuit = () => {
    if (publishingState) {
      message.warn('请先关闭直播');
      return;
    }
    navigate('/calendar');
  };

  const handleCaptureClick = async () => {
    await createScreenStream(previewVideoRef.current);
  };

  return (
    <div className={styles.liveRoomWrap}>
      <div className={styles.header}>
        <div className={styles.roomId}>
          ID: {course?.liveRoomId} &nbsp;TestAddress:{' '}
          {`http://hdl-wsdemo.zego.im/zegodemo/zegotest-2134092766-${course?.liveMixStreamId}.flv`}
        </div>
        <div className={styles.back}>
          <Button danger type="primary" onClick={onQuit}>
            退出直播间
          </Button>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles['preview-box']}>
            <video src="" muted autoPlay ref={previewVideoRef} />
          </div>

          <div className={styles.footer}>
            <ControlBar onCaptureClick={handleCaptureClick} />
          </div>
        </div>

        <div className={styles['right-side']}>
          <div className={styles['camera-box']}>
            <video
              ref={cameraVideoRef}
              // src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
              src=""
              muted
              autoPlay
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

export default observer(LiveRoom);
