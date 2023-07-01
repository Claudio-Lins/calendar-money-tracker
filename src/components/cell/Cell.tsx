"use client";
import React, { useEffect, useState } from "react";
import { HeaderCell } from "./HeaderCell";
import { EntryTypes } from "@/@types/EntryTypes";
import { Eye } from "lucide-react";

export function Cell({ entries }: EntryTypes) {
  // const [totalIncome, setTotalIncome] = useState(0);

  const totalExpense = entries
    .filter((entry) => {
      return entry.details.length > 0;
    })
    .map((entry) =>
      entry.details
        .filter((detail) => {
          return detail.type === "EXPENSE";
        })
        .reduce((acc, curr) => {
          return acc + curr.amount;
        }, 0)
    );

  console.log(totalExpense);

  return (
    <>
      {entries
        .filter((entry) => {
          return entry.details.length > 0;
        })
        .map((entry) => (
          <div
            key={entry.id}
            className="relative overflow-y-scroll w-[calc(100%/5)] h-[calc(100vw/5)] rounded-xl border-[0.5px] border-zinc-600 text-zinc-300 bg-zinc-700  flex flex-col items-center justify-between shadow-sm"
          >
            <HeaderCell
              day={new Intl.DateTimeFormat("pt-PT", {
                day: "2-digit",
              }).format(new Date(entry.updatedAt))}
              daysWeek={new Intl.DateTimeFormat("us", {
                weekday: "short",
              })
                .format(new Date(entry.updatedAt))
                .slice(0, 3)}
            />
            <div className="w-full h-full p-2 overflow-auto">
              <div className="min-w-full text-zinc-300 text-xs">
                <div
                  className={`flex flex-col gap-2
            
            `}
                >
                  {entry.details.map((details) => (
                    <div
                      key={details.id}
                      className={`flex items-center justify-between w-full border-b border-zinc-600 pb-1
                    ${
                      details.type === "INCOME"
                        ? "text-green-300"
                        : "text-red-300"
                    }
                    `}
                    >
                      <p>{details.description}</p>
                      <div className="flex items-center gap-1">
                        <strong>
                          {new Intl.NumberFormat("pt-PT", {
                            style: "currency",
                            currency: "EUR",
                          }).format(details.amount)}
                        </strong>
                        <button className="w-full py-2 whitespace-nowrap">
                          <Eye size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="z-10 bottom-0 w-full flex items-center justify-between bg-zinc-800 px-2 h-12">
              <div className="text-sm text-red-600 font-semibold">
                {entry.details
                  .filter((details) => details.type === "EXPENSE")
                  .reduce((acc, curr) => acc + curr.amount, 0)}
              </div>
              {/* <div className="text-lg text-white font-bold">
                {entry.details.reduce((acc, curr) => acc + curr.amount, 0)}
              </div> */}
              <div className="text-sm text-blue-600 font-semibold">
                {entry.details
                  .filter((details) => details.type === "INCOME")
                  .reduce((acc, curr) => acc + curr.amount, 0)}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
