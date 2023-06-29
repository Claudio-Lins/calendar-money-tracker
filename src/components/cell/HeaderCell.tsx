import { Plus, X } from "lucide-react";
import React from "react";

interface HeaderCellProps {
  daysOfWeek: string;
  day: number;
}

export function HeaderCell({ day, daysOfWeek }: HeaderCellProps) {
  return (
    <div className="w-full bg-purple-500 flex justify-between items-center px-2 h-12 relative">
      <span className=" text-white font-light ml-1">{daysOfWeek}</span>
      <span className=" text-white font-semibold text-2xl">{day}</span>
      <button className="">
        <Plus size={20} />
      </button>
    </div>
  );
}
