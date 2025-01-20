import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);

export const isCurrentDay = (day: dayjs.Dayjs) => {
  return day.isSame(dayjs(), "day");
};

export const getMonth = (month = dayjs().month()) => {
  const year = dayjs().year();
  const firstDayOfMonth = dayjs().set("month", month).startOf("month").day();

  let dayCounter = -firstDayOfMonth;

  // defines five rows
  return Array.from({ length: 5 }, () =>
    // defines 7 columns
    Array.from({ length: 7 }, () => dayjs(new Date(year, month, ++dayCounter))),
  );
};

export const getWeek = (date: dayjs.Dayjs) => {
  const startOfWeek = date.startOf("week");
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = startOfWeek.add(i, "day");
    weekDates.push({
      currentDate,
      today:
        currentDate.toDate().toDateString() === dayjs().toDate().toDateString(),
      isCurrentDay,
    });
  }

  return weekDates;
};

export const getHours = Array.from({ length: 24 }, (_, i) =>
  dayjs().startOf("day").add(i, "hour"),
);

export const getWeekNum = (monthIndex: number) => {
  const year = dayjs().year();
  const firstDayOfMonth = dayjs(new Date(year, monthIndex, 1));
  const lastDayOfMonth = dayjs(new Date(year, monthIndex + 1, 0));

  let weeks: number[] = [];

  let currentDay = firstDayOfMonth;
  while (
    currentDay.isBefore(lastDayOfMonth) ||
    currentDay.isSame(lastDayOfMonth)
  ) {
    const weekNum = currentDay.week();
    if (!weeks.includes(weekNum)) {
      weeks.push(weekNum);
    }
    currentDay = currentDay.add(1, "day");
  }

  return weeks;
};
