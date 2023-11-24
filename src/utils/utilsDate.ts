import { DateFormat } from '../store/slices/cardListSlice/types';

const currentDate = new Date();

export function getCurrentWeek(currentDate: Date) {
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((+currentDate - +startDate) / (24 * 60 * 60 * 1000));

  const weekNumber = Math.ceil(days / 7);
  return weekNumber;
}

export function getUpcomingMonday() {
  const date = new Date();
  const today = date.getDate();
  const currentDay = date.getDay();
  const newDate = date.setDate(today - currentDay + 8);
  return new Date(newDate).getDate();
}

export const today: DateFormat = {
  day: currentDate.getDate(),
  month: currentDate.getMonth() + 1,
  week: getCurrentWeek(currentDate),
  year: currentDate.getFullYear(),
};

export function getDateList(titleList: string) {
  switch (titleList) {
    case 'Сегодня':
      return {
        day: currentDate.getDate(),
        month: currentDate.getMonth() + 1,
        week: getCurrentWeek(currentDate),
        year: currentDate.getFullYear(),
      };
    case 'Завтра':
      return {
        day: currentDate.getDate() + 1,
        month: currentDate.getMonth() + 1,
        week: getCurrentWeek(currentDate),
        year: currentDate.getFullYear(),
      };
    case 'На следующей неделе':
      return {
        day: getUpcomingMonday(),
        month: currentDate.getMonth() + 1,
        week: getCurrentWeek(currentDate) + 1,
        year: currentDate.getFullYear(),
      };
    case 'Потом':
      return {
        day: 0,
        month: 0,
        week: 0,
        year: 0,
      };
    default:
      return {
        day: 0,
        month: 0,
        week: 0,
        year: 0,
      };
  }
}
