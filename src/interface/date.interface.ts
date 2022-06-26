export interface IDateInfo {
  year: number;
  month: number;
  date: number;
}

export interface ISchedule {
  startTime: number;
  endTime: number;
  title: string;
}

export interface ISchedules {
  [key: string]: string[];
}

export interface IScheduleItems {
  [key: string]: ISchedule & IDateInfo;
}
