import React from "react";
import CalendarUtils from "../CalendarUtils/CalendarUtils";
import LogoMenu from "../LogoMenu/LogoMenu";
import MonthController from "../MonthController/MonthController";
import "./HeaderContainer.scss";

export interface Props {}

const HeaderContainer: React.FC<Props> = (props: Props) => {
  return (
    <div className="header">
      <LogoMenu />
      <div className="calendar-controller">
        <MonthController />
        <CalendarUtils />
      </div>
    </div>
  );
};

export default HeaderContainer;
