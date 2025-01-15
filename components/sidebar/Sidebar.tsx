import { cn } from '@/lib/utils'
import React from 'react'
import Create from './create'
import SideCalendar from './side-calendar'
import MyCalendars from './my-calendars'
import { useToggleSidebarStore } from '@/lib/store'

export default function Sidebar() {
  const { isSidebarOpen } = useToggleSidebarStore();
  
  return (
    <aside
      className={cn("w-92 hidden transition-all duration-300 ease-in-out border-t py-3 px-2 lg:block",
        !isSidebarOpen && "lg:hidden"
      )}
    >
     <Create />
     <SideCalendar /> 
     <MyCalendars />
    </aside>
  )
}
