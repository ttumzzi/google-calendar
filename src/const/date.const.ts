export const DAYS_OF_WEEK = 7;
export const CALENDAR_DATE_LENGTH = 6 * DAYS_OF_WEEK;
export const IS_SATRT_WITH_MONDAY = true;
export const DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"];
export const TIME_LIST = [...Array(24)].map((_, i) => {
  const time = i + 1;
  if (time < 12) return `오전 ${time}시`;
  return `오후 ${time - 12}시`;
});
