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
  isEditing: boolean;
  closeModal: () => void;
  id: string;
  title: string;
}

const ScheduleModal: React.FC<Props> = (props: Props) => {
  const [title, setTitle] = useState<string>(props.title);
  const [repeatOption, setRepeatOption] = useState<TRepeatOption>("NO_REPEAT");
  const setSchedules = useSetRecoilState(schedulesState);
  const [scheduleItems, setScheduleItems] = useRecoilState(scheduleItemsState);
  const setDailyRepeated = useSetRecoilState(dailyRepeatedState);
  const setWeeklyRepeated = useSetRecoilState(weeklyRepeatedState);
  const setYearlyRepeated = useSetRecoilState(yearlyRepeatedState);
  const [isEditing, setEditing] = useState<boolean>(props.isEditing);

  const { year, month, date, id, closeModal } = props;
  if (!scheduleItems[id]) {
    return <></>;
  }
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

  const removeSchedule = () => {
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
  };

  const handleClose = () => {
    closeModal();
    if (!props.isEditing) return;
    removeSchedule();
  };

  const handleRemove = () => {
    // eslint-disable-next-line no-restricted-globals
    const isRemoving = confirm(
      "일정을 삭제할까요? (반복일정은 함께 삭제됩니다.)"
    );
    if (!isRemoving) return;

    removeSchedule();

    setDailyRepeated((prev) => prev.filter((scheduleId) => scheduleId !== id));
    setWeeklyRepeated((prev) => {
      const newSchedules = [...prev];
      newSchedules[dayIndex] =
        newSchedules[dayIndex]?.filter(
          (scheduleId: string) => scheduleId !== id
        ) || [];
      return newSchedules;
    });
    setYearlyRepeated((prev) => {
      const newSchedules = { ...prev };
      newSchedules[`${month}/${date}`] =
        newSchedules[`${month}/${date}`]?.filter(
          (scheduleId: string) => scheduleId !== id
        ) || [];
      return newSchedules;
    });
    closeModal();
  };

  const handleEdit = () => {
    setEditing(true);
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
        <div className="close-button" onClick={handleClose}>
          <FaTimes />
        </div>
      </div>
      <div className="section">
        <div className="title">
          <input
            type="text"
            placeholder="제목 추가"
            onChange={handleChangeTitle}
            readOnly={!isEditing}
            value={title}
          />
        </div>
        {isEditing && (
          <div className="detail-type-select">
            <button className="detail-type-btn">이벤트</button>
            <button disabled>할 일</button>
            <button disabled>알림</button>
          </div>
        )}
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
              <select onChange={handleChangeRepeatOption} disabled={!isEditing}>
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
        {isEditing ? (
          <>
            <button disabled>옵션 더보기</button>
            <button className="primary" onClick={handleSave}>
              저장
            </button>
          </>
        ) : (
          <>
            <button className="primary" onClick={handleEdit}>
              수정
            </button>
            <button className="warning" onClick={handleRemove}>
              삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ScheduleModal;
