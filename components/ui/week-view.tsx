import React, { useEffect, useState } from 'react'
import { getWeek } from '@/lib/getDate'
import { useDateStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'

export default function WeekView() {

  const [currentTime, setCurrentTime] = useState(dayjs())
  const { userSelectedDate } = useDateStore()
  const Days = getWeek(userSelectedDate)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs())
    }, 600000);
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] place-items-center px-4 py-2'>
      <div className='w-16 border-r border-gray-300'>
        <div className='relative h-16'>
          <div className='absolute top-2 text-xs text-gray-600'>
            GMT -5
          </div>
        </div>
      </div>

      {/* week view header */}
      { getWeek(userSelectedDate).map(({currentDate, today}, index) => (
        <div key={index} className='flex flex-col items-center'>
        {/* day labels */}
        <div className={cn('text-xs', today && 'text-blue-600')}>
          {currentDate.format('ddd')}
        </div>

        {/* date labels */}
        <div className={cn('h-12 w-12 rounded-full p-2 text-2xl',
          today && 'bg-blue-600 text-white',
        )}>
          {currentDate.format('DD')}{" "}
        </div>
        </div>

      )) }
    </div>
  )
}
