import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export function SubHeader() {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full p-2 flex items-center justify-between">
        <div className="ml-4 flex items-center gap-1 text-zinc-100 text-3xl ">
          <strong>June</strong>
          <span>2023</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="px-2 h-5 rounded-lg bg-zinc-600 text-white text-[10px]">
            <ChevronLeft size={12} />
          </button>
          <button className="px-4 h-5 rounded-lg bg-zinc-600 text-white text-[10px]">
            Today
          </button>
          <button className="px-2 h-5 rounded-lg bg-zinc-600 text-white text-[10px]">
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
      {/* <div className="w-full flex items-center">
        <span className="block pr-2 w-[calc(100%/7)] text-right text-zinc-300 font-light">
          Sun
        </span>
        <span className="block pr-2 w-[calc(100%/7)] text-right text-zinc-300 font-light">
          Mon
        </span>
        <span className="block pr-2 w-[calc(100%/7)] text-right text-zinc-300 font-light">
          Tue
        </span>
        <span className="block pr-2 w-[calc(100%/7)] text-right text-zinc-300 font-light">
          Web
        </span>
        <span className="block pr-2 w-[calc(100%/7)] text-right text-zinc-300 font-light">
          Thu
        </span>
        <span className="block pr-2 w-[calc(100%/7)] text-right text-zinc-300 font-light">
          Fri
        </span>
        <span className="block pr-2 w-[calc(100%/7)] text-right text-zinc-300 font-light">
          Sat
        </span>
      </div> */}
    </div>
  );
}

// w-[calc(100%/7)]
