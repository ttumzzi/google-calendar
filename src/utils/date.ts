import { CALENDAR_DATE_LENGTH, IS_SATRT_WITH_MONDAY } from "../const/date";

export const getCurrentYear = () => {
  return new Date().getFullYear();
};

export const getCurrentMonth = () => {
  return new Date().getMonth() + 1;
};

export const getCurrentDate = () => {
  return new Date().getDate();
};

export const getDaysString = () => {
  return IS_SATRT_WITH_MONDAY
    ? "월화수목금토일".split("")
    : "일월화수목금토".split("");
};

export const isToday = (year: number, month: number, date: number) => {
  return (
    year === getCurrentYear() &&
    month === getCurrentMonth() &&
    date === getCurrentDate()
  );
};

export const getDateLength = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

export const getLastMonthYear = (year: number, month: number) => {
  return month === 1 ? year - 1 : year;
};

export const getLastMonth = (month: number) => {
  return month === 1 ? 12 : month - 1;
};

export const getNextMonthYear = (year: number, month: number) => {
  return month === 12 ? year + 1 : year;
};

export const getNextMonth = (month: number) => {
  return month === 12 ? 1 : month + 1;
};

export const getPrevMonthDates = (year: number, month: number) => {
  const firstDateDay = new Date(`${year}.${month}.01`).getDay();
  const leftDays = IS_SATRT_WITH_MONDAY
    ? firstDateDay === 0
      ? 6
      : firstDateDay - 1
    : firstDateDay;

  const lastYear = getLastMonthYear(year, month);
  const lastMonth = getLastMonth(month);
  const lastMonthDateLength = getDateLength(lastYear, lastMonth);
  return Array.from(
    { length: leftDays },
    (_, i) => lastMonthDateLength - i
  ).reverse();
};

export const getNextMonthDates = (currentDateLength: number) => {
  const leftDays = CALENDAR_DATE_LENGTH - currentDateLength;
  return Array.from({ length: leftDays }, (_, i) => i + 1);
};
