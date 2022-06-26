import { selector } from "recoil";
import { DAYS_OF_WEEK } from "../const/date.const";
import {
  getPrevMonthDates,
  getDateLength,
  getNextMonthDates,
  getLastMonthYear,
  getLastMonth,
  getNextMonthYear,
  getNextMonth,
} from "../utils/date";
import {
  calendarDateState,
  calendarMonthState,
  calendarYearState,
} from "./date.atom";

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

export const weekDateListState = selector({
  key: "weekDateListState",
  get: ({ get }) => {
    const calendarYear = get(calendarYearState);
    const calendarMonth = get(calendarMonthState);
    const calendarDate = get(calendarDateState);
    const dateList = get(calendarDateListState);

    const index = dateList.findIndex(
      ({ year, month, date }) =>
        year === calendarYear &&
        month === calendarMonth &&
        date === calendarDate
    );

    if (index === -1) {
      throw new Error("invalid datelist");
    }

    const startIndex = index - (index % DAYS_OF_WEEK);
    return dateList.slice(startIndex, startIndex + DAYS_OF_WEEK);
  },
});
