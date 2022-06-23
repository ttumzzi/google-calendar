import React from "react";
import { IDateInfo } from "../../../interface/interfaces";
import { getDayString } from "../../../utils/date";
import Date from "../../common/Date/Date";
import TimeTable from "../TimeTable/TimeTable";
import "./DaySchedule.scss";

export interface Props extends IDateInfo {}

const DaySchedule: React.FC<Props> = (props: Props) => {
  return (
    <div className="day-schedule">
      <div className="date-container">
        <div className="day">
          {getDayString(props.year, props.month, props.date)}
        </div>
        <div>
          <Date {...props} />
        </div>
      </div>
      <TimeTable {...props} />
    </div>
  );
};

export default DaySchedule;
