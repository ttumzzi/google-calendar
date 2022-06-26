import React, { ChangeEvent, useState } from "react";
import "./ScheduleModal.scss";
import { FaTimes } from "react-icons/fa";
import {
  IDateInfo,
  IScheduleItems,
  ISchedules,
} from "../../../interface/date.interface";
import {
  getDateKey,
  getDayIndex,
  getDayString,
  getTimeFormat,
} from "../../../utils/date";
import { BiTimeFive } from "react-icons/bi";
import { TRepeatOption } from "../../../type/date.type";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  dailyRepeatedState,
  scheduleItemsState,
  schedulesState,
  weeklyRepeatedState,
  yearlyRepeatedState,
} from "../../../recoil/date.atom";

export interface Props extends IDateInfo {
  closeModal: () => void;
  id: string;
}

const ScheduleModal: React.FC<Props> = (props: Props) => {
  const [title, setTitle] = useState<string>("");
  const [repeatOption, setRepeatOption] = useState<TRepeatOption>("NO_REPEAT");
  const setSchedules = useSetRecoilState(schedulesState);
  const [scheduleItems, setScheduleItems] = useRecoilState(scheduleItemsState);
  const setDailyRepeated = useSetRecoilState(dailyRepeatedState);
  const setWeeklyRepeated = useSetRecoilState(weeklyRepeatedState);
  const setYearlyRepeated = useSetRecoilState(yearlyRepeatedState);

  const { year, month, date, id, closeModal } = props;
  const { startTime, endTime } = scheduleItems[id];
  const dayIndex = getDayIndex(year, month, date);
  const dayString = `${getDayString(year, month, date)}요일`;
  const dateKey = getDateKey(year, month, date);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeRepeatOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setRepeatOption(event.target.value as TRepeatOption);
  };

  const handleRemove = () => {
    setScheduleItems((prev: IScheduleItems) => {
      const newScheduleItems = { ...prev };
      delete newScheduleItems[id];
      return newScheduleItems;
    });

    setSchedules((prev: ISchedules) => {
      const newScheduls = { ...prev };
      const currentDateSchedules = [...prev[dateKey]] || [];

      const index = currentDateSchedules.findIndex(
        (scheduleId) => scheduleId === id
      );

      if (index !== -1) currentDateSchedules.splice(index, 1);
      return { ...newScheduls, [dateKey]: currentDateSchedules };
    });
    closeModal();
  };

  const handleSave = () => {
    setScheduleItems((prev: IScheduleItems) => {
      const newScheduleItems = { ...prev };
      newScheduleItems[id] = {
        ...newScheduleItems[id],
        title,
      };
      return newScheduleItems;
    });

    switch (repeatOption) {
      case "EVERYDAY":
        setDailyRepeated((prev) => [...prev, id]);
        break;
      case "WEEK":
        setWeeklyRepeated((prev) => {
          const currentWeekly = [...prev];
          currentWeekly[dayIndex] = [...(currentWeekly[dayIndex] || []), id];
          return currentWeekly;
        });
        break;
      case "YEAR":
        setYearlyRepeated((prev) => {
          const currentYearly = { ...prev };
          currentYearly[`${month}/${date}`] = [
            ...(currentYearly[`${month}/${date}`] || []),
            id,
          ];
          return currentYearly;
        });
        break;
    }

    closeModal();
  };

  return (
    <div className="schedule-modal">
      <div className="header">
        <div className="close-button" onClick={handleRemove}>
          <FaTimes />
        </div>
      </div>
      <div className="section">
        <div className="title">
          <input
            type="text"
            placeholder="제목 추가"
            onChange={handleChangeTitle}
          />
        </div>
        <div className="detail-type-select">
          <button className="detail-type-btn">이벤트</button>
          <button disabled>할 일</button>
          <button disabled>알림</button>
        </div>
        <div className="detail-items">
          <div className="time">
            <div className="time-icon icon">
              <BiTimeFive />
            </div>
            <div className="time-detail">
              <div>
                {month}월 {date}일({dayString}){"  "}
                {getTimeFormat(startTime, endTime, true)}
              </div>
              <select onChange={handleChangeRepeatOption}>
                <option value="NO_REPEAT">반복 안함</option>
                <option value="EVERYDAY">매일</option>
                <option value="WEEK">매주 {dayString}</option>
                <option value="YEAR">
                  매년 {month}월 {date}일
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <button disabled>옵션 더보기</button>
        <button className="primary" onClick={handleSave}>
          저장
        </button>
      </div>
    </div>
  );
};

export default ScheduleModal;
