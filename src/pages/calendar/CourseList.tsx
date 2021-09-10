import { useState, FC, useEffect } from 'react';
import { Select, Spin, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { Moment } from 'moment';
import { ReactComponent as ClockSvg } from 'assets/svgs/clock.svg';
import styles from './style.module.less';
import { getTimeZone } from 'utils/tool';
import { getDayCourses } from 'api';

const { Option } = Select;

/**
 * 每节课的结构
 */
interface TypeClass {
  casId: number;
  conversationId: string;
  courseName: string;
  deleted: number;
  flag: number | string;
  id: number;
  liveAt: number;
  liveDuration: number;
  roomId: string;
  subId: number;
  teacherId: string;
  liveBegin: string;
  liveEnd: string;
}

interface PropsCoursList {
  currentDate: Moment;
}

const FLAG_TAG: {
  [key: string]: any;
  [index: number]: any;
} = {
  '-1': 'All Course',
  0: 'Not Start',
  1: 'In Class',
  2: 'Course Over',
};
const currentTimeZone = getTimeZone();

const CourseList: FC<PropsCoursList> = ({ currentDate }) => {
  const [classList, setClassList] = useState<TypeClass[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterFlag, setFilterFlag] = useState(-1);
  const navigate = useNavigate();

  const onFlagChange = (e: number) => {
    setFilterFlag(e);
    fetchGetDayCourses();
  };

  const onClassClick = (item: TypeClass) => {
    navigate(`/live-room/${item.roomId}`);
  };

  const fetchGetDayCourses = async () => {
    setIsLoading(true);
    const resp = await getDayCourses<TypeClass[]>({
      beginTime: currentDate.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      endTime: currentDate.endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      flag: filterFlag,
    });
    setIsLoading(false);
    if (resp.ret === 20000) {
      setClassList(resp.result);
    }
  };

  useEffect(() => {
    fetchGetDayCourses();
    return () => {};
  }, [currentDate]);

  return (
    <Spin wrapperClassName={styles.course_list_wrapper} spinning={isLoading}>
      <div className="head">
        <div className="title">{currentDate.format('dddd, LL')}</div>
        <Select defaultValue={FLAG_TAG[filterFlag]} onChange={onFlagChange}>
          {Object.keys(FLAG_TAG).map(key => {
            return (
              <Option key={key} value={key}>
                {FLAG_TAG[key]}
              </Option>
            );
          })}
        </Select>
      </div>
      <div className={`body ${classList.length === 0 ? 'body_empty' : ''}`}>
        {classList.map((item, index) => {
          return (
            <div
              className="class-card"
              key={item.courseName + index}
              onClick={() => onClassClick(item)}
            >
              <div className="class-title">
                {FLAG_TAG[item.flag] || 'Course'}
              </div>
              <div className="class-desc">{item.courseName}</div>
              <div className="class-time">
                <ClockSvg className="icon" />
                <div>
                  {`{UTC ${currentTimeZone}}`} {item.liveBegin} - {item.liveEnd}
                </div>
              </div>
            </div>
          );
        })}

        {classList.length === 0 && <Empty />}
      </div>
    </Spin>
  );
};

export default CourseList;
