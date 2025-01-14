import dayjs from 'dayjs'

export const isCurrentDay = (day: dayjs.Dayjs) => {
  return day.isSame(dayjs(), 'day')
}

export const getMonth = (month = dayjs().month()) => {

  const year = dayjs().year()
  const firstDayOfMonth = dayjs().set('month', month).startOf('month').day()
  
  let dayCounter = -firstDayOfMonth

  // defines five rows
  return Array.from({ length: 5 }, () => 
    // defines 7 columns 
    Array.from({ length: 7 }, () => dayjs(new Date(year, month, ++dayCounter)))
  )
}

export const getWeek = (date: dayjs.Dayjs) => {
  const startOfWeek = date.startOf('week');
  const weekDates = []

  for (let i = 0; i < 7; i++) {
    const currentDate = startOfWeek.add(i, 'day')
    weekDates.push({
      currentDate,
      today:
        currentDate.toDate().toDateString() === dayjs().toDate().toDateString(),
        isCurrentDay,
    })
  }

  return weekDates;
}

export const getHours = Array.from({length: 24}, (_ , i) => 
  dayjs().startOf('day').add(i, 'hour'),
)