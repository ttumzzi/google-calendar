import React from "react";
import { useRecoilState } from "recoil";
import { calendarMonthState, calendarYearState } from "../../../recoil/atom";
import {
  getLastMonth,
  getLastMonthYear,
  getNextMonth,
  getNextMonthYear,
} from "../../../utils/date";
import MoveArrowButtons from "../../common/MoveArrowButtons/MoveArrowButtons";
import DatePicker from "../DatePicker/DatePicker";
import "./CalendarContainer.scss";

export interface Props {}

const CalendarContainer: React.FC<Props> = (props: Props) => {
  const [year, setYear] = useRecoilState(calendarYearState);
  const [month, setMonth] = useRecoilState(calendarMonthState);

  const handlePrevButtonClick = () => {
    const lastMonthYear = getLastMonthYear(year, month);
    const lastMonth = getLastMonth(month);

    if (year !== lastMonthYear) setYear(lastMonthYear);
    setMonth(lastMonth);
  };

  const handleNextButtonClick = () => {
    const nextMonthYear = getNextMonthYear(year, month);
    const nextMonth = getNextMonth(month);

    if (year !== nextMonthYear) setYear(nextMonthYear);
    setMonth(nextMonth);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div>
          {year}년 {month}월
        </div>
        <MoveArrowButtons
          handlePrevButtonClick={handlePrevButtonClick}
          handleNextButtonClick={handleNextButtonClick}
        />
      </div>
      <DatePicker />
    </div>
  );
};

export default CalendarContainer;
