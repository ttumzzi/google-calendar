import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  dailyRepeatedState,
  scheduleItemsState,
  schedulePointerEventState,
  schedulesState,
  weeklyRepeatedState,
  yearlyRepeatedState,
} from "../../../recoil/date.atom";
import "./Schedules.scss";
import variables from "../../../assets/style/size.scss";
import { getDayIndex, getTimeFormat } from "../../../utils/date";
import dayjs from "dayjs";

export interface Props {
  dateKey: string;
}

const Schedules: React.FC<Props> = ({ dateKey }: Props) => {
  const totalSchedules = useRecoilValue(schedulesState);
  const scheduleItems = useRecoilValue(scheduleItemsState);
  const { timeBlockHeight } = variables;
  const schedulePointerEvent = useRecoilValue(schedulePointerEventState);
  const [schedules, setSchedules] = useState(totalSchedules[dateKey] || []);

  const dailyRepeated = useRecoilValue(dailyRepeatedState);
  const weeklyRepeated = useRecoilValue(weeklyRepeatedState);
  const yearlyRepeated = useRecoilValue(yearlyRepeatedState);
  const [year, month, date] = [...dateKey.split("/")].map((item) =>
    Number(item)
  );
  const dayIndex = getDayIndex(year, month, date);

  const getFilteredRepeated = (scheduleIds: string[]) => {
    return scheduleIds.filter((id) => {
      const item = scheduleItems[id];
      return dayjs(`${year}-${month}-${date}`).isAfter(
        `${item.year}-${item.month}-${item.date}`
      );
    });
  };

  useEffect(() => {
    let currentSchedules = [...(totalSchedules[dateKey] || [])];

    if (dailyRepeated.length > 0) {
      const newSchedules = getFilteredRepeated(dailyRepeated);
      currentSchedules = [...currentSchedules, ...newSchedules];
    }
    if (weeklyRepeated[dayIndex].length > 0) {
      const newSchedules = getFilteredRepeated(weeklyRepeated[dayIndex]);
      currentSchedules = [...currentSchedules, ...newSchedules];
    }
    if (yearlyRepeated[`${month}/${date}`]?.length > 0) {
      const newSchedules = getFilteredRepeated(
        yearlyRepeated[`${month}/${date}`]
      );
      currentSchedules = [...currentSchedules, ...newSchedules];
    }

    setSchedules(currentSchedules);
  }, [scheduleItems]);

  return (
    <div className="schedules">
      {schedules?.map((id: string) => {
        if (!scheduleItems[id]) return null;

        const { startTime, endTime, title } = scheduleItems[id];
        const prevTime = Math.min(startTime, endTime);
        const nextTime = Math.max(startTime, endTime);
        const isLineBreaking = nextTime - prevTime >= 0.75;

        return (
          <div
            key={`${id}_${dateKey}`}
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
