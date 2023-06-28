"use client";
import { UserButton } from "@clerk/nextjs";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

export function Footer() {
  const [isDashboard, setIsDashboard] = useState(false);
  return (
    <div
      className={`
      bg-purple-600 fixed bottom-0 flex flex-col w-full h-20 text-zinc-50 items-center justify-between
      transition-all duration-500
      ${isDashboard && "h-96"}
      `}
    >
      <div className="flex-1 p-4 items-center w-full bg-zinc-700 justify-center">
        <div className="p-4 w-full h-full rounded-lg bg-zinc-400 flex items-center justify-center">
          Dashboar
        </div>
      </div>
      <div className="flex fixed bottom-0 items-center justify-between bg-zinc-800 w-full p-4">
        <div className="ml-4">© 2021</div>
        <button
          onClick={() => setIsDashboard(!isDashboard)}
          className="mr-4 flex flex-col items-center group"
        >
          {isDashboard ? (
            <ChevronDown />
          ) : (
            <ChevronUp className="group-hover:animate-bounce" />
          )}
          <span className="text-xs">Dashboard</span>
        </button>
        <div className="flex items-center">
          <UserButton />
        </div>
      </div>
    </div>
  );
}
