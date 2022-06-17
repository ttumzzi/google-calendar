import React from "react";
import "./CalendarUtils.scss";
import { HiOutlineSearch } from "react-icons/hi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";

export interface Props {}

const CalendarUtils: React.FC<Props> = (props: Props) => {
  return (
    <div className="calendar-utils">
      <div className="search">
        <HiOutlineSearch fontSize={20} />
      </div>
      <div className="info">
        <AiOutlineInfoCircle fontSize={20} />
      </div>
      <div className="setting">
        <IoSettingsOutline fontSize={20} />
      </div>
      <div className="select-type">
        <div className="text">주</div>
        <div className="dropdown">
          <MdArrowDropDown />
        </div>
      </div>
    </div>
  );
};

export default CalendarUtils;
