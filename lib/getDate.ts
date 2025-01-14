import dayjs from 'dayjs'

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