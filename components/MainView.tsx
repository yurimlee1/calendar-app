import React from 'react'
import MonthView from './month-view'
import Sidebar from './sidebar/Sidebar'

export default function MainView() {
  return (
    <div className='flex'>
      {/* sidebar */}
      <Sidebar /> 
      
      <div className="w full flex-1">
        <MonthView />
      </div>

    </div>
  )
}
