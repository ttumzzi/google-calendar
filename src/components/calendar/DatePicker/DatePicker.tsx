import React, { useState } from "react";
import "./DatePicker.scss";
import { calendarDateListState } from "../../../recoil/selector";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { getDaysString, isToday } from "../../../utils/date";
import classnames from "classnames";
import {
  calendarDateState,
  calendarMonthState,
  calendarYearState,
  currentDateState,
  currentMonthState,
  currentYearState,
} from "../../../recoil/atom";

export interface Props {}

const DatePicker: React.FC<Props> = (props: Props) => {
  const [calendarYear, setCalendarYear] = useRecoilState(calendarYearState);
  const [calendarMonth, setCalendarMonth] = useRecoilState(calendarMonthState);
  const [calendarDate, setCalendarDate] = useRecoilState(calendarDateState);
  const setCurrentYear = useSetRecoilState(currentYearState);
  const setCurrentMonth = useSetRecoilState(currentMonthState);
  const setCurrentDate = useSetRecoilState(currentDateState);
  const dates = useRecoilValue(calendarDateListState);

  const isActive = (year: number, month: number, date: number) => {
    return (
      !isToday(year, month, date) &&
      calendarYear === year &&
      calendarMonth === month &&
      calendarDate === date
    );
  };

  const handleClickDate = (year: number, month: number, date: number) => {
    setCalendarYear(year);
    setCalendarMonth(month);
    setCalendarDate(date);
    setCurrentYear(year);
    setCurrentMonth(month);
    setCurrentDate(date);
  };

  return (
    <div className="date-picker">
      {getDaysString().map((day) => (
        <div key={day} className="day">
          {day}
        </div>
      ))}
      {dates.map(({ year, month, date }) => (
        <div
          key={`${year}${month}${date}`}
          onClick={handleClickDate.bind(null, year, month, date)}
          className={classnames(
            "date",
            { today: isToday(year, month, date) },
            { bold: month === calendarMonth },
            { active: isActive(year, month, date) }
          )}
        >
          {date}
        </div>
      ))}
    </div>
  );
};

export default DatePicker;
