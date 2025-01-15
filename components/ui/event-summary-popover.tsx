import { CalendarEventType } from "@/lib/store"
import { fchown } from "fs"
import { useEffect, useRef } from "react"
import { Button } from "./button"
import { IoCloseSharp } from "react-icons/io5"
import dayjs from "dayjs"

interface EventSummaryPopoverProps {
  isOpen: boolean
  onClose: () => void
  event: CalendarEventType
}

export function EventSummaryPopover({ isOpen, onClose, event }: EventSummaryPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div ref={popoverRef} className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Event Summary</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <IoCloseSharp className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <p><strong>Title:</strong>{event.title}</p>
          {/* format the date prior to displaying it */}
          <p><strong>Date:</strong>{dayjs(event.date).format("dddd, MMMM D, YYYY h:mm A")}</p>
          
        </div>
      </div>
    </div>
  )
}