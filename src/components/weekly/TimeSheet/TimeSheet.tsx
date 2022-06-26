import { uniqueId } from "lodash";
import React from "react";
import useTimeBlockMove from "../../../hooks/useTimeBlockMove";
import { IDateInfo } from "../../../interface/date.interface";
import "./TimeSheet.scss";

export interface Props extends IDateInfo {}

const TimeSheet: React.FC<Props> = (props: Props) => {
  const { handleMouseDown, handleMouseMove } = useTimeBlockMove({ ...props });

  return (
    <ul className="time-sheet">
      {new Array(24 * 4).fill(0).map((_, i) => (
        <li
          className="time-block"
          key={i}
          data-time={(i + 1) / 4 - 0.25}
          onMouseDown={handleMouseDown.bind(null, uniqueId("schedule_"))}
          onMouseMove={handleMouseMove}
        ></li>
      ))}
    </ul>
  );
};

export default React.memo(TimeSheet);
