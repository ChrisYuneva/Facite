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
