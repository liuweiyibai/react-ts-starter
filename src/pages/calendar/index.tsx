import { FC, useState, useEffect } from 'react';
import { Calendar, Button, Select } from 'antd';
import type { HeaderRender } from 'antd/lib/calendar/generateCalendar';
import styles from './style.module.less';
import moment, { Moment } from 'moment';
import CourseList from './CourseList';
import { useStores } from 'store/hooks';
import { getCalendars } from 'api';

const { Option } = Select;

interface TypeDayCourse {
  count: number;
  day: string;
}

const months = [...new Array(12)].map((t, i) => ({
  value: i,
  label: `${i + 1}月`,
}));

const headerRenderFunc: HeaderRender<Moment> = ({ value, onChange }) => {
  const month = value.month();
  const year = value.year();
  const options = [];
  for (let i = year - 10; i < year + 10; i += 1) {
    options.push(
      <Select.Option key={`year-${i}`} value={i} className="year-item">
        {i}
      </Select.Option>,
    );
  }

  return (
    <div className="cal-header">
      <div className="year-month-select">
        <Select
          size="small"
          dropdownMatchSelectWidth={false}
          className="year-select"
          onChange={(newYear: any) => {
            onChange(value.clone().year(newYear));
          }}
          value={String(year)}
        >
          {options}
        </Select>
        <Select
          size="small"
          dropdownMatchSelectWidth={false}
          value={month}
          onChange={selectedMonth => {
            const newValue = value.clone();
            newValue.month(selectedMonth);
            onChange(newValue);
          }}
        >
          {months.map((month, index) => (
            <Option
              className="month-item"
              key={`month-${index}`}
              value={month.value}
            >
              {month.label}
            </Option>
          ))}
        </Select>
      </div>
      <Button
        type="primary"
        size="small"
        onClick={() => {
          onChange(moment());
        }}
      >
        返回今天
      </Button>
    </div>
  );
};

const dateCellRenderFunc = (dayList: TypeDayCourse[]) => {
  return (value: Moment) => {
    const hasClass = dayList.some(item => {
      return value.isSame(item.day, 'day');
    });
    if (hasClass) {
      return <div className="point" />;
    }
    return null;
  };
};

const CourseCalendar: FC = () => {
  const [dayList, setDayList] = useState<TypeDayCourse[]>([]);
  const [currentDate, setCurrentDate] = useState(moment());

  const { visibleAppDetection, toggleVisibleAppDetection } =
    useStores('appStore');

  const handleOnChange = (date: Moment) => {
    setCurrentDate(date);
  };

  const fetchCalendars = async () => {
    const resp = await getCalendars<TypeDayCourse[]>({
      beginTime: currentDate
        .clone()
        .add(-1, 'month')
        .endOf('month')
        .format('YYYY-MM-DD HH:mm:ss'),
      endTime: currentDate
        .clone()
        .add(1, 'month')
        .startOf('month')
        .format('YYYY-MM-DD HH:mm:ss'),
    });
    if (resp.ret === 20000) {
      setDayList(resp.result);
    }
  };

  useEffect(() => {
    fetchCalendars();
  }, []);

  useEffect(() => {
    if (!visibleAppDetection) {
      toggleVisibleAppDetection();
    }
  }, []);

  return (
    <section className={styles.calendar_container}>
      <div className={styles.calendar}>
        <Calendar
          fullscreen={false}
          value={currentDate}
          onChange={handleOnChange}
          headerRender={headerRenderFunc}
          dateCellRender={dateCellRenderFunc(dayList)}
        />
      </div>
      <CourseList currentDate={currentDate} />
    </section>
  );
};

export default CourseCalendar;
