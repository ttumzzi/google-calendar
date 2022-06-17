import React from "react";
import { useRecoilState } from "recoil";
import { currentMonthState, currentYearState } from "../../../recoil/atom";
import "./MonthController.scss";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export interface Props {}

const MonthController: React.FC<Props> = (props: Props) => {
  const [year, setYear] = useRecoilState(currentYearState);
  const [month, setMonth] = useRecoilState(currentMonthState);

  const handlePrevMonthClick = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
      return;
    }

    setMonth(month - 1);
  };

  const handleNextMonthClick = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
      return;
    }

    setMonth(month + 1);
  };

  return (
    <div className="month-controller">
      <button className="today-btn">오늘</button>
      <div className="month-move-btns">
        <div className="prev-month" onClick={handlePrevMonthClick}>
          <GrFormPrevious />
        </div>
        <div className="next-month" onClick={handleNextMonthClick}>
          <GrFormNext />
        </div>
      </div>
      <div className="date-display">
        {year}년 {month}월
      </div>
    </div>
  );
};

export default MonthController;
