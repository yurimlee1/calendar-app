"use client"
import React from 'react'
import MonthView from './month-view'
import Sidebar from './sidebar/Sidebar'
import { useDateStore, useEventStore, useViewStore } from '@/lib/store'
import WeekView from './ui/week-view'
import DayView from './ui/day-view'
import EventPopover from './ui/event-popover'

export default function MainView() {
  const { selectedView } = useViewStore()
  const {
    isPopoverOpen,
    closePopover,
    isEventSummaryOpen,
    closeEventSummary,
    selectedEvent,
    setEvents,
  } = useEventStore();
  
  const { userSelectedDate } = useDateStore();

  return (
    <div className='flex'>
      {/* sidebar */}
      <Sidebar /> 
      
      <div className="w full flex-1">
        {selectedView === "month" && <MonthView />}
        {selectedView === "week" && <WeekView />}
        {selectedView === "day" && <DayView />}
      </div>
      
      {isPopoverOpen && (
        <EventPopover
          isOpen={isPopoverOpen}
          onClose={closePopover}
          date={userSelectedDate.format('YYYY-MM-DD')}
        />
      )}

    </div>
  )
}
