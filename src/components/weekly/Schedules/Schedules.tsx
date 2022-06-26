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
import useModal from "../../../hooks/useModal";
import ScheduleModal from "../../modal/ScheduleModal/ScheduleModal";

export interface Props {
  dateKey: string;
}

const Schedules: React.FC<Props> = ({ dateKey }: Props) => {
  const totalSchedules = useRecoilValue(schedulesState);
  const scheduleItems = useRecoilValue(scheduleItemsState);
  const { timeBlockHeight } = variables;
  const schedulePointerEvent = useRecoilValue(schedulePointerEventState);
  const [schedules, setSchedules] = useState(totalSchedules[dateKey] || []);
  const { getModalId, openModal, closeModal } = useModal();

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

  const handleClick = (id: string) => {
    const scheduleItem = scheduleItems[id];
    const modalId = getModalId();
    const props = {
      ...scheduleItem,
      id,
      closeModal: closeModal.bind(null, modalId),
      isEditing: false,
    };
    const component = <ScheduleModal {...props} />;
    openModal(modalId, component);
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
            onClick={handleClick.bind(null, id)}
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
