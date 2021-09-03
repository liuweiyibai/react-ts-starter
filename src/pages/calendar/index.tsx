import { FC, useState } from 'react';
import { Calendar, Button, Select } from 'antd';
import type { HeaderRender } from 'antd/lib/calendar/generateCalendar';
import styles from './style.module.less';
import moment, { Moment } from 'moment';
import CourseList from './CourseList';

const { Option } = Select;

interface TypeDayCourse {
  count: number;
  day: string;
}

const headerRenderFunc: HeaderRender<Moment> = ({ value, onChange }) => {
  const start = 0;
  const end = 12;
  const monthOptions = [];
  const current = value.clone();
  const localeData = value.localeData();
  const months = [];
  for (let i = 0; i < 12; i++) {
    current.month(i);
    months.push(localeData.monthsShort(current));
  }

  for (let index = start; index < end; index++) {
    monthOptions.push(
      <Option className="month-item" key={`${index}`} value={months[index]}>
        {months[index]}
      </Option>,
    );
  }
  const month = value.month();
  const year = value.year();
  const options = [];
  for (let i = year - 10; i < year + 10; i += 1) {
    options.push(
      <Select.Option key={i} value={i} className="year-item">
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
          value={String(month)}
          onChange={selectedMonth => {
            const newValue = value.clone();
            newValue.month(parseInt(selectedMonth, 10));
            onChange(newValue);
          }}
        >
          {monthOptions}
        </Select>
      </div>
      <Button
        type="primary"
        size="small"
        onClick={() => {
          onChange(moment());
        }}
      >
        Today
      </Button>
    </div>
  );
};

const dateCellRenderFunc = (dayList: TypeDayCourse[]) => {
  return (value: Moment) => {
    const hasClass = dayList.some(item => {
      return value.isSame(item.day, 'day');
    });
    if (!hasClass) {
      return <div className="point" />;
    }
    return null;
  };
};

const CourseCalendar: FC = () => {
  const [dayList, setDayList] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());
  const handleOnChange = (date: Moment) => {
    console.log(date);
    setCurrentDate(date);
  };

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
