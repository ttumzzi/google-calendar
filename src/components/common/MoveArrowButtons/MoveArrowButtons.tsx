import React from "react";
import "./MoveArrowButtons.scss";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export interface Props {
  handlePrevButtonClick: () => void;
  handleNextButtonClick: () => void;
}

const MoveArrowButtons: React.FC<Props> = (props: Props) => {
  return (
    <div className="month-move-btns">
      <div className="prev-month" onClick={props.handlePrevButtonClick}>
        <GrFormPrevious />
      </div>
      <div className="next-month" onClick={props.handleNextButtonClick}>
        <GrFormNext />
      </div>
    </div>
  );
};

export default MoveArrowButtons;
