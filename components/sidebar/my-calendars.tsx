import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from '@/lib/utils'

const myCalendars = [
  { id: 'cal1', title: 'Birthdays', color: 'accet-blue-600' },
]
export default function MyCalendars() {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger className='justify-normal gap32 text-sm hover:no-underline'>
          My Calendars
        </AccordionTrigger>
        <AccordionContent className='grid gap-2'>
          {myCalendars.map((cal) => (
            <div className='items-top flex space-x-2' key={cal.id}>
              <input
                type='checkbox'
                id={cal.id}
                className={cn('h-4 w-4 rounded-none', `${cal.color}`)}
              />
              <div className='grid gap-1.5 leading-none'>
                <label
                  htmlFor={cal.id}
                  className='text-sm font-medium leading-none
                   text-gray-600 peer-disabled:cursor-not-allowed
                    peer-disabled:opacity-70'
                >
                  {cal.title}
                </label>
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
