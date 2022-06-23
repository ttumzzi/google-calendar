import React from "react";
import { IDateInfo } from "../../../interface/interfaces";
import Schedules from "../Schedules/Schedules";
import TimeSheet from "../TimeSheet/TimeSheet";
import "./TimeTable.scss";

export interface Props extends IDateInfo {}

const TimeTable: React.FC<Props> = (props: Props) => {
  const dateKey = `${props.year}/${props.month}/${props.date}`;

  return (
    <div className="time-table">
      <TimeSheet dateKey={dateKey} />
      <Schedules dateKey={dateKey} />
    </div>
  );
};

export default TimeTable;
