import { Plus, X } from "lucide-react";
import Link from "next/link";
import React from "react";

interface HeaderCellProps {
  daysWeek: any;
  day: any;
  href: string;
}

export function HeaderCell({ day, daysWeek, href }: HeaderCellProps) {
  return (
    <div className="w-full bg-purple-500 flex justify-between items-center px-2 h-12 relative">
      <span className=" text-white font-light ml-1">{daysWeek}</span>
      <span className=" text-white font-semibold text-2xl">{day}</span>
      <Link href={href} className="">
        <Plus size={20} />
      </Link>
    </div>
  );
}
