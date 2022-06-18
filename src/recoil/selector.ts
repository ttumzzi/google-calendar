import { selector } from "recoil";
import {
  getPrevMonthDates,
  getDateLength,
  getNextMonthDates,
  getLastMonthYear,
  getLastMonth,
  getNextMonthYear,
  getNextMonth,
} from "../utils/date";
import { calendarMonthState, calendarYearState } from "./atom";

export const calendarDateListState = selector({
  key: "calendarDateListState",
  get: ({ get }) => {
    const year = get(calendarYearState);
    const month = get(calendarMonthState);
    const length = getDateLength(year, month);

    const currentMonthDates = Array.from({ length }, (_, i) => i + 1);
    const prevMonthDates = getPrevMonthDates(year, month);
    const nextMOnthDates = getNextMonthDates(
      currentMonthDates.length + prevMonthDates.length
    );

    const currentMonthInDateFormat = currentMonthDates.map((date) => {
      return { year, month, date };
    });
    const prevMonthInDateFormat = prevMonthDates.map((date) => {
      const lastMonthYear = getLastMonthYear(year, month);
      const lastMonth = getLastMonth(month);
      return { year: lastMonthYear, month: lastMonth, date };
    });
    const nextMonthInDateFormat = nextMOnthDates.map((date) => {
      const nextMonthYear = getNextMonthYear(year, month);
      const nextMonth = getNextMonth(month);
      return { year: nextMonthYear, month: nextMonth, date };
    });

    return [
      ...prevMonthInDateFormat,
      ...currentMonthInDateFormat,
      ...nextMonthInDateFormat,
    ];
  },
});
