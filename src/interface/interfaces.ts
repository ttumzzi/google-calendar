export interface IDateInfo {
  year: number;
  month: number;
  date: number;
}

export interface ISchedule {
  id: string;
  startTime: number;
  endTime: number;
  title: string;
}

export interface ISchedules {
  [key: string]: ISchedule[];
}
