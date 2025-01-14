'use client'
import { getMonth } from '@/lib/getDate'
import React, { Fragment } from 'react'
import MonthViewBox from './ui/month-view-box'

export default function MonthView() {
  // console.table(getMonth())
  const currentMonth = getMonth()
  return (
    <section className='grid grid-cols-7 grid-rows-5 lg:h-[100vh]'>
      {
        currentMonth.map((row, i) => (
          <Fragment key={i}>
            {
              row.map((day, index) => (
                // <h3 key={index}>{day.format('D')}</h3>
                <MonthViewBox key={index} day={day} rowIndex={i} />
              ))
            }
          </Fragment>
        ))
      }
    </section>
  )
}
