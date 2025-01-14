import React, { useEffect, useState } from 'react'
import { getHours, getWeek } from '@/lib/getDate'
import { useDateStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'
import { ScrollArea } from '@radix-ui/react-scroll-area'

export default function WeekView() {

  const [currentTime, setCurrentTime] = useState(dayjs())
  const { userSelectedDate } = useDateStore()
  const Days = getWeek(userSelectedDate)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs())
    }, 1000);
    return () => clearInterval(interval)
  }, [])

  const calculateIndicatorPosition = (currentTime: dayjs.Dayjs) => {
    const startOfDay = currentTime.startOf('day')
    const totalSecondsInDay = 24 * 60 * 60
    const secondsElapsed = currentTime.diff(startOfDay, 'second')
    return (secondsElapsed / totalSecondsInDay) * 100
  }

  return (
    <>
    
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
    {/*  display each hour for a week */}
    <ScrollArea className='h-[70vh]'>
      <div className='grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] px-4 py-2'>
        <div className='w-16 border-r border-gray-300'>
          {getHours.map((hour, index) => (
            <div key={index} className='relative h-16'>
              <div className='absolute -top-2 text-xs text-gray-600'>
                {hour.format("HH:mm")}
              </div>
            </div>
          ))}
        </div>

        {/*  */}
        {getWeek(userSelectedDate).map(({isCurrentDay, today}, index) => {
          const dayDate = userSelectedDate.startOf('week').add(index, 'day')

          return (
            // draws columns
            <div key={index} className='relative border-r border-gray-300'>
              {getHours.map((hour, i) => (
                // draws rows
                <div key={i} className='relative flex h-16 cursor-pointer flex-col items-center gap-y-2 border-b border-gray-300 hover:bg-gray-100'>

                </div>
              ))}

              {/* draw a live linear indicator */}
              {isCurrentDay(dayDate) && today && (
                <div className={cn('absolute h-0.5 w-full bg-red-600')} style={{top: `${calculateIndicatorPosition(currentTime)}%`,}}></div>
              )}
            </div>
          )
        })}
      </div>
    </ScrollArea>
    </>
  )
}
