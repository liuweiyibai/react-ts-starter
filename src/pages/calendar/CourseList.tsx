import { useState, FC } from 'react';
import { Select, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment, { Moment } from 'moment';
import { ReactComponent as ClockSvg } from 'assets/svgs/clock.svg';
import styles from './style.module.less';
import { getTimeZone } from 'utils/tool';

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
  const [classList, setClassList] = useState<TypeClass[]>([
    {
      casId: 0,
      conversationId: '6131ba40d433dd5042e775d5',
      courseName: 'liuwei-test',
      deleted: 0,
      flag: 0,
      id: 523642,
      liveAt: 1630605677000,
      liveDuration: 999,
      roomId: 'test-20210903060158-100000671',
      subId: 70,
      teacherId: '3adcf8d5',
      liveBegin: moment(1630605677000).format('MM/DD HH:mm'),
      liveEnd: moment(1630605677000 + 999 * 1000 * 60).format('MM/DD HH:mm'),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterFlag, setFilterFlag] = useState('-1');
  const navigate = useNavigate();

  const onFlagChange = () => {};
  const onClassClick = (item: TypeClass) => {
    navigate(`/live-room/${item.roomId}`);
  };

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
      <div className="body">
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
      </div>
    </Spin>
  );
};

export default CourseList;
