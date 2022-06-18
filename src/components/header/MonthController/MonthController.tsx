import React from "react";
import { useRecoilState } from "recoil";
import { currentMonthState, currentYearState } from "../../../recoil/atom";
import MoveArrowButtons from "../../common/MoveArrowButtons/MoveArrowButtons";
import "./MonthController.scss";

export interface Props {}

const MonthController: React.FC<Props> = (props: Props) => {
  const [year, setYear] = useRecoilState(currentYearState);
  const [month, setMonth] = useRecoilState(currentMonthState);

  return (
    <div className="month-controller">
      <button className="today-btn">오늘</button>
      <div className="month-move-container">
        <MoveArrowButtons
          handlePrevButtonClick={() => {}}
          handleNextButtonClick={() => {}}
        />
      </div>
      <div className="year-month-container">
        {year}년 {month}월
      </div>
    </div>
  );
};

export default MonthController;
