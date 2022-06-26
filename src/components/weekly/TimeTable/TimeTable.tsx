import React from "react";
import { IDateInfo } from "../../../interface/date.interface";
import { getDateKey } from "../../../utils/date";
import Schedules from "../Schedules/Schedules";
import TimeSheet from "../TimeSheet/TimeSheet";
import "./TimeTable.scss";

export interface Props extends IDateInfo {}

const TimeTable: React.FC<Props> = (props: Props) => {
  const dateKey = getDateKey(props.year, props.month, props.date);

  return (
    <div className="time-table">
      <TimeSheet {...props} />
      <Schedules dateKey={dateKey} />
    </div>
  );
};

export default TimeTable;
