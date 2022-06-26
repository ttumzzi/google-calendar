import { atom } from "recoil";
import { IScheduleItems, ISchedules } from "../interface/date.interface";
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

export const scheduleItemsState = atom<IScheduleItems>({
  key: "scheduleItemsState",
  default: {
    org_schedule_1: {
      startTime: 8.5,
      endTime: 11,
      title: "걷기",
      year: 2022,
      month: 6,
      date: 23,
    },
    org_schedule_2: {
      startTime: 14,
      endTime: 20,
      title: "달리기",
      year: 2022,
      month: 6,
      date: 21,
    },
    org_schedule_3: {
      startTime: 9,
      endTime: 10,
      title: "공부",
      year: 2022,
      month: 6,
      date: 24,
    },
  },
});

// key: 날짜 포맷(YYYY/M/D) & value: ISchedule[]
export const schedulesState = atom<ISchedules>({
  key: "schedulesState",
  default: {
    "2022/6/20": ["org_schedule_1"],
    "2022/6/22": ["org_schedule_2"],
    "2022/6/25": ["org_schedule_3"],
  },
});

export const schedulePointerEventState = atom<"none" | "auto">({
  key: "schedulePointerEventState",
  default: "auto",
});

export const dailyRepeatedState = atom<string[]>({
  key: "dailyRepeatedState",
  default: [],
});

export const weeklyRepeatedState = atom({
  key: "weeklyRepeatedState",
  default: Array(7).fill([]),
});

// key: 월/일
export const yearlyRepeatedState = atom<{ [key: string]: string[] }>({
  key: "yearlyRepeatedState",
  default: {},
});
