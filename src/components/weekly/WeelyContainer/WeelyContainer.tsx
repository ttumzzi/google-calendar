import React from "react";
import { useRecoilValue } from "recoil";
import { IDateInfo } from "../../../interface/interfaces";
import { weekDateListState } from "../../../recoil/selector";
import DaySchedule from "../DaySchedule/DaySchedule";
import Timeline from "../Timeline/Timeline";
import "./WeelyContainer.scss";

export interface Props {}

const WeelyContainer: React.FC<Props> = (props: Props) => {
  const weekly = useRecoilValue(weekDateListState);

  return (
    <div className="weekly-container">
      <Timeline />
      <div className="weekly-schedules">
        {weekly.map((dateInfo: IDateInfo) => (
          <DaySchedule
            {...dateInfo}
            key={`${dateInfo.month}${dateInfo.date}`}
          />
        ))}
      </div>
    </div>
  );
};

export default WeelyContainer;
