import React from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import Image from "next/image"
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function HeaderLeft() {
  return (
    <div className="flex items-center gap-3">
      {/* sidebar toggle and calendar icon */}
      <div className="hidden items-center lg:flex gap-1">
        <Button variant="ghost" className="rounded-full p-2">
          <Menu className="size-6" />
        </Button>
        {/* <Image src={} className="" /> */}
        <FaRegCalendarAlt width={40} height={40} />
        <h1 className="text-xl">Calendar</h1>
      </div>

      {/* today button */}
      <Button variant='outline'>Today</Button>

      {/* navigation controls */}
      <div className="flex items-center gap-3">
        <MdKeyboardArrowLeft
          className="size-6 cursor-pointer font-bold"
          // onClick={handlePrevClick}
        />
        <MdKeyboardArrowRight
          className="size-6 cursor-pointer font-bold"
          // onClick={handleNextClick}
        />
      </div>

      {/* current month and year display */}
      <h1 className="hidden text-xl lg:block">January 13 2025</h1>
    </div>
  );
}
