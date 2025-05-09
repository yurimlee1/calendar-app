import { getHours, getWeek, isCurrentDay } from "@/lib/getDate";
import { useDateStore, useEventStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { EventRenderer } from "./event-renderer";
import { useTheme } from "next-themes";

export default function DayView() {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const { userSelectedDate, setDate } = useDateStore();
  const { openPopover, events } = useEventStore();
  const { theme } = useTheme();
  const Days = getWeek(userSelectedDate);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const calculateIndicatorPosition = (currentTime: dayjs.Dayjs) => {
    const startOfDay = currentTime.startOf("day");
    const totalSecondsInDay = 24 * 60 * 60;
    const secondsElapsed = currentTime.diff(startOfDay, "second");
    return (secondsElapsed / totalSecondsInDay) * 100;
  };

  const isToday =
    userSelectedDate.format("DD-MM-YY") === dayjs().format("DD-MM-YY");

  return (
    <>
      <div className="grid grid-cols-[auto_auto_1fr] px-4">
        <div
          className={
            theme === "dark"
              ? "w-16 border-r border-gray-600 text-xs"
              : "w-16 border-r border-gray-300 text-xs"
          }
        >
          GMT -5
        </div>

        <div className="flex w-16 flex-col items-center">
          <div className={cn("text-xs", isToday && "text-blue-600")}>
            {userSelectedDate.format("ddd")}{" "}
          </div>{" "}
          <div
            className={cn(
              "h-12 w-12 rounded-full p-2 text-2xl",
              isToday && "bg-blue-600 text-white",
            )}
          >
            {userSelectedDate.format("DD")}{" "}
          </div>
        </div>
      </div>

      <ScrollArea className="h-[70vh]">
        <div className="grid grid-cols-[auto_1fr] p-4">
          {/* draws column and displays each hour */}
          <div
            className={
              theme === "dark"
                ? "w-16 border-r border-gray-600"
                : "w-16 border-r border-gray-300"
            }
          >
            {getHours.map((hour, index) => (
              <div key={index} className="relative h-16">
                <div
                  className={
                    theme === "dark"
                      ? "absolute -top-2 text-xs text-gray-300"
                      : "absolute -top-2 text-xs text-gray-600"
                  }
                >
                  {hour.format("HH:mm")}
                </div>
              </div>
            ))}
          </div>

          <div
            className={
              theme === "dark"
                ? "relative border-r border-gray-600"
                : "relative border-r border-gray-300"
            }
          >
            {getHours.map((hour, i) => (
              <div
                key={i}
                className={
                  theme === "dark"
                    ? "relative flex h-16 cursor-pointer flex-col items-center gap-y-2 border-b border-gray-600 hover:bg-gray-100"
                    : "relative flex h-16 cursor-pointer flex-col items-center gap-y-2 border-b border-gray-300 hover:bg-gray-100"
                }
                onClick={() => {
                  setDate(userSelectedDate.hour(hour.hour()));
                  openPopover();
                }}
              >
                <EventRenderer
                  events={events}
                  date={userSelectedDate.hour(hour.hour())}
                  view="day"
                />
              </div>
            ))}

            {/* draw a live linear indicator */}
            {isCurrentDay(userSelectedDate) && (
              <div
                className={cn("absolute h-0.5 w-full bg-red-600")}
                style={{ top: `${calculateIndicatorPosition(currentTime)}%` }}
              ></div>
            )}
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
