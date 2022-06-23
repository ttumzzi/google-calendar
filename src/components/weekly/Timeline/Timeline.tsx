import React from "react";
import { TIME_LIST } from "../../../const/date.const";
import "./Timeline.scss";

export interface Props {}

const Timeline: React.FC<Props> = (props: Props) => {
  return (
    <div className="timeline">
      {new Array(24).fill(0).map((_, i) => (
        <div key={i} className="time-display">
          <div className="time-display-mark"></div>
          <div className="time-display-text">{TIME_LIST[i]}</div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(Timeline);
