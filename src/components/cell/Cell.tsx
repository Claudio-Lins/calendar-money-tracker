import React from "react";
import { HeaderCell } from "./HeaderCell";
import { FooterCell } from "./FooterCell";
import { ContentCell } from "./ContentCell";
import { EntryTypes } from "@/@types/EntryTypes";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function Cell({ entries }: EntryTypes) {
  return (
    <div className="w-[calc(100%/5)] h-[calc(100vw/5)] rounded-xl border-[0.5px] border-zinc-600 text-zinc-300 bg-zinc-700 overflow-y-auto flex flex-col items-center justify-between shadow-sm">
      <HeaderCell day={20} daysWeek="Thu" />
      <div className="w-full p-2 h-full">
        <ContentCell entries={entries} />
      </div>
      <FooterCell />
    </div>
  );
}
