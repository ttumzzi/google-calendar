import { atom } from "recoil";
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
