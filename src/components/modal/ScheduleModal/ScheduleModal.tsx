import React, { ChangeEvent, useState } from "react";
import "./ScheduleModal.scss";
import { FaTimes } from "react-icons/fa";
import { IDateInfo, ISchedule } from "../../../interface/date.interface";
import { getDateKey, getDayString, getTimeFormat } from "../../../utils/date";
import { BiTimeFive } from "react-icons/bi";
import { TRepeatOption } from "../../../type/date.type";
import { useRecoilState } from "recoil";
import { schedulesState } from "../../../recoil/date.atom";

export interface Props extends ISchedule, IDateInfo {
  closeModal: () => void;
}

const ScheduleModal: React.FC<Props> = (props: Props) => {
  const { year, month, date, startTime, endTime, id, closeModal } = props;
  const day = `${getDayString(year, month, date)}요일`;
  const dateKey = getDateKey(year, month, date);

  const [title, setTitle] = useState<string>("");
  const [repeatOption, setRepeatOption] = useState<TRepeatOption>("NO_REPEAT");
  const [schedules, setSchedules] = useRecoilState(schedulesState);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeRepeatOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setRepeatOption(event.target.value as TRepeatOption);
  };

  const handleRemove = () => {
    const currentDateSchedules = [...schedules[dateKey]] || [];
    const index = currentDateSchedules.findIndex(
      (schedule) => schedule.id === id
    );
    if (index !== -1) currentDateSchedules.splice(index, 1);
    setSchedules({ ...schedules, [dateKey]: currentDateSchedules });
    closeModal();
  };

  const handleSave = () => {
    const currentDateSchedules = schedules[dateKey] || [];
    const index = currentDateSchedules.findIndex(
      (schedule) => schedule.id === id
    );
    const newSchedules = [...currentDateSchedules];
    newSchedules[index] = { id, startTime, endTime, title };

    setSchedules({ ...schedules, [dateKey]: newSchedules });
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
                {month}월 {date}일({day}){"  "}
                {getTimeFormat(startTime, endTime, true)}
              </div>
              <select onChange={handleChangeRepeatOption}>
                <option value="NO_REPEAT">반복 안함</option>
                <option value="EVERYDAY">매일</option>
                <option value="WEEK">매주 {day}</option>
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
