import { atom } from "recoil";
import { ISchedules } from "../interface/date.interface";
import { getCurrentDate, getCurrentMonth, getCurrentYear } from "../utils/date";

export const currentYearState = atom<number>({
  key: "currentYearState",
  default: getCurrentYear(),
});

export const currentMonthState = atom<number>({
  key: "currentMonthState",
  default: getCurrentMonth(),
});

export const currentDateState = atom<number>({
  key: "currentDateState",
  default: getCurrentDate(),
});

export const calendarYearState = atom<number>({
  key: "calendarYearState",
  default: getCurrentYear(),
});

export const calendarMonthState = atom<number>({
  key: "calendarMonthState",
  default: getCurrentMonth(),
});

export const calendarDateState = atom<number>({
  key: "calendarDateState",
  default: getCurrentDate(),
});

// key: 날짜 포맷(YYYY/M/D) & value: ISchedule[]
export const schedulesState = atom<ISchedules>({
  key: "schedulesState",
  default: {
    "2022/6/20": [{ id: "1", startTime: 8.5, endTime: 11, title: "걷기" }],
    "2022/6/22": [{ id: "2", startTime: 14, endTime: 20, title: "달리기" }],
    "2022/6/25": [{ id: "3", startTime: 9, endTime: 10, title: "공부" }],
  },
});

export const schedulePointerEventState = atom<"none" | "auto">({
  key: "schedulePointerEventState",
  default: "auto",
});
