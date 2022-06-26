import {
  CALENDAR_DATE_LENGTH,
  DAY_LIST,
  IS_SATRT_WITH_MONDAY,
} from "../const/date.const";

export const getCurrentYear = () => {
  return new Date().getFullYear();
};

export const getCurrentMonth = () => {
  return new Date().getMonth() + 1;
};

export const getCurrentDate = () => {
  return new Date().getDate();
};

export const getDayString = (year: number, month: number, date: number) => {
  const day = new Date(`${year}.${month}.${date}`).getDay();
  return DAY_LIST[day];
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

const _getTimeToString = (time: number) => {
  const hour = Math.floor(time);
  const minute = (time - hour) * 60;

  const timeText = hour > 12 ? "오후" : "오전";
  const formatedHour = hour > 12 ? hour - 12 : hour;
  const formatedTimeSign = minute === 0 ? "시" : ":";
  const formatedMinute = minute === 0 ? "" : String(minute).padStart(2, "0");

  return `${timeText} ${formatedHour}${formatedTimeSign}${formatedMinute}`;
};

export const getTimeFormat = (
  prevTime: number,
  nextTime: number,
  isLineBreaking: boolean
) => {
  if (!isLineBreaking) {
    return `, ${_getTimeToString(prevTime)}`;
  }

  return `${_getTimeToString(prevTime)} ~ ${_getTimeToString(nextTime)}`;
};

export const getDateKey = (year: number, month: number, date: number) => {
  return `${year}/${month}/${date}`;
};
