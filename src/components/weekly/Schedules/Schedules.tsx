import React from "react";
import { useRecoilValue } from "recoil";
import { ISchedule } from "../../../interface/interfaces";
import {
  schedulePointerEventState,
  schedulesState,
} from "../../../recoil/atom";
import "./Schedules.scss";
import variables from "../../../assets/style/size.scss";
import { getTimeFormat } from "../../../utils/date";

export interface Props {
  dateKey: string;
}

const Schedules: React.FC<Props> = ({ dateKey }: Props) => {
  const totalSchedules = useRecoilValue(schedulesState);
  const schedules: ISchedule[] = totalSchedules[dateKey];
  const { timeBlockHeight } = variables;
  const schedulePointerEvent = useRecoilValue(schedulePointerEventState);

  return (
    <div className="schedules">
      {schedules?.map(({ startTime, endTime, title, id }: ISchedule) => {
        const prevTime = Math.min(startTime, endTime);
        const nextTime = Math.max(startTime, endTime);
        const isLineBreaking = nextTime - prevTime >= 0.75;

        return (
          <div
            key={id}
            className="schedule"
            style={{
              top: `calc(${timeBlockHeight} * ${prevTime} * 4 + ${
                0.5 * Math.ceil(prevTime)
              }px)`,
              height: `calc(${timeBlockHeight} * ${Math.max(
                nextTime - prevTime,
                0.5
              )} * 4)`,
              pointerEvents: schedulePointerEvent,
              display: isLineBreaking ? "flex" : "inline-block",
            }}
            data-id={id}
          >
            <div className="title">{title}</div>
            <div className="time">
              {getTimeFormat(prevTime, nextTime, isLineBreaking)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Schedules;
