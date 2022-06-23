import React from "react";
import "./Date.scss";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  calendarDateState,
  calendarMonthState,
  calendarYearState,
  currentDateState,
  currentMonthState,
  currentYearState,
} from "../../../recoil/atom";
import classNames from "classnames";
import { isToday } from "../../../utils/date";
import { IDateInfo } from "../../../interface/interfaces";

export interface Props extends IDateInfo {}

const Date: React.FC<Props> = ({ year, month, date }: Props) => {
  const [calendarYear, setCalendarYear] = useRecoilState(calendarYearState);
  const [calendarMonth, setCalendarMonth] = useRecoilState(calendarMonthState);
  const [calendarDate, setCalendarDate] = useRecoilState(calendarDateState);
  const setCurrentYear = useSetRecoilState(currentYearState);
  const setCurrentMonth = useSetRecoilState(currentMonthState);
  const setCurrentDate = useSetRecoilState(currentDateState);

  const isActive = () => {
    return (
      !isToday(year, month, date) &&
      calendarYear === year &&
      calendarMonth === month &&
      calendarDate === date
    );
  };

  const handleClickDate = () => {
    setCalendarYear(year);
    setCalendarMonth(month);
    setCalendarDate(date);
    setCurrentYear(year);
    setCurrentMonth(month);
    setCurrentDate(date);
  };

  return (
    <div
      key={`${year}${month}${date}`}
      onClick={handleClickDate}
      className={classNames(
        "date",
        { today: isToday(year, month, date) },
        { bold: month === calendarMonth },
        { active: isActive() }
      )}
    >
      {date}
    </div>
  );
};

export default Date;
