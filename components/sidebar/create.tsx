import React, { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { useDateStore } from "@/lib/store";
import { EventRenderer } from "../ui/event-renderer";
import EventPopover from "../ui/event-popover";

export default function Create() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handleOpenPopover = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPopoverOpen(true);
  }, []);
  const handleClosePopover = useCallback(() => {
    setIsPopoverOpen(false);
  }, []);
  const { userSelectedDate } = useDateStore();

  return (
    <>
      <Button
        // variant="ghost"
        className="w-[150px] justify-start rounded-full py-6 shadow"
        onClick={handleOpenPopover}
      >
        Create
      </Button>
      {isPopoverOpen && (
        <EventPopover
          isOpen={isPopoverOpen}
          onClose={handleClosePopover}
          date={userSelectedDate.format("YYYY-MM-DD")}
        />
      )}
    </>
  );
}
