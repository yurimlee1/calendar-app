"use client";
import React, { useEffect } from "react";
import MonthView from "./month-view";
import Sidebar from "./sidebar/Sidebar";
import {
  CalendarEventType,
  useDateStore,
  useEventStore,
  useViewStore,
} from "@/lib/store";
import WeekView from "./ui/week-view";
import DayView from "./ui/day-view";
import EventPopover from "./ui/event-popover";
import { EventSummaryPopover } from "./ui/event-summary-popover";
import dayjs from "dayjs";

export default function MainView({
  eventData,
}: {
  eventData: CalendarEventType[];
}) {
  const { selectedView } = useViewStore();
  const {
    isPopoverOpen,
    closePopover,
    isEventSummaryOpen,
    closeEventSummary,
    selectedEvent,
    setEvents,
  } = useEventStore();

  const { userSelectedDate } = useDateStore();

  useEffect(() => {
    const mappedEvents: CalendarEventType[] = eventData.map((event) => ({
      id: event.id,
      date: dayjs(event.date),
      title: event.title,
      description: event.description,
    }));

    setEvents(mappedEvents);
  }, [eventData, setEvents]);

  return (
    <div className="flex">
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
          date={userSelectedDate.format("YYYY-MM-DD")}
        />
      )}

      {isEventSummaryOpen && selectedEvent && (
        <EventSummaryPopover
          isOpen={isEventSummaryOpen}
          onClose={closeEventSummary}
          event={selectedEvent}
        />
      )}
    </div>
  );
}
