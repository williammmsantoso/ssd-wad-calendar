export const daysInMonth = (month) => {
  const year = new Date().getFullYear();
  const d = new Date(year, month + 1, 0);
  return d.getDate();
}

export const firstDayOfMonth = (month) => {
  const year = new Date().getFullYear();
  const d = new Date(year, month, 1);
  return d.getDay();
}

export const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const weekdaysList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
