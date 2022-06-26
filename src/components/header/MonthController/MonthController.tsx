import dayjs from "dayjs";
import React from "react";
import { useRecoilState } from "recoil";
import {
  calendarDateState,
  calendarMonthState,
  calendarYearState,
  currentDateState,
  currentMonthState,
  currentYearState,
} from "../../../recoil/date.atom";
import MoveArrowButtons from "../../common/MoveArrowButtons/MoveArrowButtons";
import "./MonthController.scss";

export interface Props {}

const MonthController: React.FC<Props> = (props: Props) => {
  const [year, setYear] = useRecoilState(calendarYearState);
  const [month, setMonth] = useRecoilState(calendarMonthState);
  const [date, setDate] = useRecoilState(calendarDateState);
  const currentDate = `${year}-${month}-${date}`;

  const handleClickToday = () => {
    setYear(dayjs().get("year"));
    setMonth(dayjs().get("month") + 1);
    setDate(dayjs().get("date"));
  };

  return (
    <div className="month-controller">
      <button className="today-btn" onClick={handleClickToday}>
        오늘
      </button>
      <div className="month-move-container">
        <MoveArrowButtons
          handlePrevButtonClick={() => {
            const aWeekAgo = dayjs(currentDate).subtract(7, "day");
            setYear(aWeekAgo.get("year"));
            setMonth(aWeekAgo.get("month") + 1);
            setDate(aWeekAgo.get("date"));
          }}
          handleNextButtonClick={() => {
            const aWeekAgo = dayjs(currentDate).add(7, "day");
            setYear(aWeekAgo.get("year"));
            setMonth(aWeekAgo.get("month") + 1);
            setDate(aWeekAgo.get("date"));
          }}
        />
      </div>
      <div className="year-month-container">
        {year}년 {month}월
      </div>
    </div>
  );
};

export default MonthController;
