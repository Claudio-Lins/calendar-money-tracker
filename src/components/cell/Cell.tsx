"use client";
import React, { useEffect, useState } from "react";
import { HeaderCell } from "./HeaderCell";
import { Eye } from "lucide-react";
import { useNewEntrie } from "@/context/entriesStore";
import { EntryTypes } from "@/@types/EntryTypes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function Cell({ entries }: EntryTypes) {
  return (
    <>
      {entries
        .filter((entry) => {
          return entry.entryDetails.length > 0;
        })
        // sort by date
        .sort((a, b) => {
          return (
            new Date(b.entryDetails[0].createdAt).getTime() -
            new Date(a.entryDetails[0].createdAt).getTime()
          );
        })
        .map((entry) => {
          const totalExpenseAmount = entry.entryDetails
            .filter((details) => details.type === "EXPENSE")
            .reduce((acc, curr) => acc + curr.amount, 0);
          const totalIncomeAmount = entry.entryDetails
            .filter((details) => details.type === "INCOME")
            .reduce((acc, curr) => acc + curr.amount, 0);
          return (
            <div
              key={entry.id}
              className="relative overflow-hidden w-[calc(100%/5)] h-[calc(100vw/5)] rounded-xl border-[0.5px] border-zinc-600 text-zinc-300 bg-zinc-700  flex flex-col items-center justify-between shadow-sm"
            >
              <HeaderCell
                day={new Intl.DateTimeFormat("pt-PT", {
                  day: "2-digit",
                }).format(new Date(entry.entryDetails[0].createdAt))}
                daysWeek={new Intl.DateTimeFormat("us", {
                  weekday: "short",
                })
                  .format(new Date(entry.entryDetails[0].createdAt))
                  .slice(0, 3)}
                href={`/entry/${entry.id}`}
              />
              <ScrollArea className="w-full h-full p-4">
                <div className="min-w-full text-zinc-300 text-xs">
                  {entry.entryDetails.map((details) => (
                    <div
                      key={details.id}
                      className={`flex items-center justify-between w-full border-b border-zinc-600 pb-1
              ${details.type === "INCOME" ? "text-green-300" : "text-red-300"}
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
                        <Separator className="my-6" />
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="bottom-0  w-full flex items-center justify-between bg-zinc-800 px-2 h-16">
                <div className="text-sm text-red-600 font-semibold">
                  {new Intl.NumberFormat("pt", {
                    style: "currency",
                    currency: "EUR",
                  }).format(totalExpenseAmount)}
                </div>
                <div className="text-lg text-white font-bold">
                  {new Intl.NumberFormat("pt", {
                    style: "currency",
                    currency: "EUR",
                  }).format(totalIncomeAmount - totalExpenseAmount)}
                </div>
                <div className="text-sm text-blue-600 font-semibold">
                  {new Intl.NumberFormat("pt", {
                    style: "currency",
                    currency: "EUR",
                  }).format(totalIncomeAmount)}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
