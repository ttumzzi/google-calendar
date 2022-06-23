import "./DatePicker.scss";
import { calendarDateListState } from "../../../recoil/selector";
import { useRecoilValue } from "recoil";
import { getDaysString } from "../../../utils/date";
import Date from "../../common/Date/Date";

export interface Props {}

const DatePicker: React.FC<Props> = (props: Props) => {
  const dates = useRecoilValue(calendarDateListState);

  return (
    <div className="date-picker">
      {getDaysString().map((day) => (
        <div key={day} className="day">
          {day}
        </div>
      ))}
      {dates.map(({ year, month, date }) => (
        <Date
          year={year}
          month={month}
          date={date}
          key={`${year}${month}${date}`}
        />
      ))}
    </div>
  );
};

export default DatePicker;
