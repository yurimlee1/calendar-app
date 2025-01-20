"use client";
import React from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useDateStore, useToggleSidebarStore, useViewStore } from "@/lib/store";
import dayjs from "dayjs";

export default function HeaderLeft() {
  const today = dayjs();
  const { userSelectedDate, setDate, setMonth, selectedMonthIndex } =
    useDateStore();
  const { selectedView } = useViewStore();
  const { setSidebarOpen } = useToggleSidebarStore();
  const dateDisplay = selectedView == "day";

  const handleTodayClick = () => {
    switch (selectedView) {
      case "month":
        setMonth(dayjs().month());
        break;
      case "week":
        setDate(today);
        break;
      case "day":
        setDate(today);
        setMonth(dayjs().month());
        break;
      default:
        break;
    }
  };

  const handlePrevClick = () => {
    switch (selectedView) {
      case "month":
        setMonth(selectedMonthIndex - 1);
        break;
      case "week":
        setDate(userSelectedDate.subtract(1, "week"));
        break;
      case "day":
        setDate(userSelectedDate.subtract(1, "day"));
        break;
      default:
        break;
    }
  };

  const handleNextClick = () => {
    switch (selectedView) {
      case "month":
        setMonth(selectedMonthIndex + 1);
        break;
      case "week":
        setDate(userSelectedDate.add(1, "week"));
        break;
      case "day":
        setDate(userSelectedDate.add(1, "day"));
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* sidebar toggle and calendar icon */}
      <div className="hidden items-center gap-1 lg:flex">
        <Button
          variant="ghost"
          className="rounded-full p-2"
          onClick={() => setSidebarOpen()}
        >
          <Menu className="size-6" />
        </Button>
        {/* <Image src={} className="" /> */}
        <FaRegCalendarAlt width={40} height={40} />
        <h1 className="text-xl">Calendar</h1>
      </div>

      {/* today button */}
      <Button variant="outline" onClick={handleTodayClick}>
        Today
      </Button>

      {/* navigation controls */}
      <div className="flex items-center gap-3">
        <MdKeyboardArrowLeft
          className="size-6 cursor-pointer font-bold"
          onClick={handlePrevClick}
        />
        <MdKeyboardArrowRight
          className="size-6 cursor-pointer font-bold"
          onClick={handleNextClick}
        />
      </div>

      {/* current month and year display */}
      <h1 className="hidden text-xl lg:block">
        {dateDisplay
          ? userSelectedDate.format("MMMM D, YYYY")
          : dayjs(new Date(dayjs().year(), selectedMonthIndex)).format(
              "MMMM YYYY",
            )}
      </h1>
    </div>
  );
}
