"use client"
import React from 'react'
import MonthView from './month-view'
import Sidebar from './sidebar/Sidebar'
import { useViewStore } from '@/lib/store'
import WeekView from './ui/week-view'
import DayView from './ui/day-view'

export default function MainView() {
  const { selectedView } = useViewStore()
  return (
    <div className='flex'>
      {/* sidebar */}
      <Sidebar /> 
      
      <div className="w full flex-1">
        {selectedView === "month" && <MonthView />}
        {selectedView === "week" && <WeekView />}
        {selectedView === "day" && <DayView />}
        
      </div>

    </div>
  )
}
