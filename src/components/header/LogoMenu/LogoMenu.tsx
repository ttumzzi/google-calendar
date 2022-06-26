import React from "react";
import "./LogoMenu.scss";
import { VscMenu } from "react-icons/vsc";
import logoSrc from "../../../assets/img/calendar-logo.png";

export interface Props {}

const LogoMenu: React.FC<Props> = (props: Props) => {
  return (
    <div className="logo-menu">
      <div className="menu preparing">
        <VscMenu fontSize={20} />
      </div>
      <div className="logo">
        <div className="logo-image">
          <img src={logoSrc} alt="calendar-logo" />
        </div>
        <div className="logo-text">캘린더</div>
      </div>
    </div>
  );
};

export default LogoMenu;
