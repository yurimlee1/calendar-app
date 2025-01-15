import { getWeekNum } from "@/lib/getDate";
import { useDateStore } from "@/lib/store";
import dayjs from "dayjs";
import React, { Fragment } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import MonthViewBox from "../ui/month-view-box";
import { cn } from "@/lib/utils";

export default function SideCalendar() {
  const { setMonth, selectedMonthIndex, twoDMonthArray } = useDateStore();
  const weeksOfMonth = getWeekNum(selectedMonthIndex);
  return (
    <div className="my-6 p-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm px-8">
          {dayjs(new Date(dayjs().year(), selectedMonthIndex)).format(
            "MMMM YYYY",
          )}
        </h4>
        <div className="flex items-center gap-3">
          <MdKeyboardArrowLeft
            className="size-5 cursor-pointer font-bold"
            onClick={() => setMonth(selectedMonthIndex - 1)}
          />
          <MdKeyboardArrowRight
            className="size-5 cursor-pointer font-bold"
            onClick={() => setMonth(selectedMonthIndex + 1)}
          />
        </div>
      </div>
      {/* header row: days of the week */}
      <div className="mt-2 grid grid-cols-[auto_1fr]">
        <div className="w-6"></div>
        <div className="grid grid-cols-7 text-xs">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <span key={i} className="py-1 text-center">
              {day}
            </span>
          ))}
        </div>
      </div>

      {/*  */}
      <div className="mt-2 grid grid-cols-[auto_1fr] text-xs">
        {/* week number column */}
        <div className="grid w-6 grid-rows-5 gap-1 gap-y-3 rounded-md bg-gray-50 p-1">
          {weeksOfMonth.map((week, i) => (
            <span
              key={i}
              className="flex h-5 w-5 items-center justify-center text-gray-800"
            >
              {week}
            </span>
          ))}
        </div>
        {/* date grid */}
        <div className='grid grid-cols-7 grid-rows-5 gap-1 gap-y-3 rounded-sm p-1 text-xs'>
        {twoDMonthArray.map((row, i) => (
          <Fragment key={i}>
            {row.map((day, index) => (
              <button
                key={index}
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full",
                  day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") &&
                    "bg-blue-600 text-white",
                )}
              >
                <span>{day.format("D")}</span>
              </button>
            ))}
          </Fragment>
        ))}</div>
      </div>
    </div>
  );
}
