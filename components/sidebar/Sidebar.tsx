import { cn } from '@/lib/utils'
import React from 'react'
import Create from './create'
import SideCalendar from './side-calendar'
import MyCalendars from './my-calendars'

export default function Sidebar() {
  return (
    <aside
      className={cn("w-92 hidden transition-all duration-300 ease-in-out border-t py-3 px-2 lg:block")}
    >
     <Create />
     <SideCalendar /> 
     <MyCalendars />
    </aside>
  )
}
