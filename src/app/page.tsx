import { Entries } from "@/components/Entries";
import { Cell } from "@/components/cell/Cell";
import { ContentCell } from "@/components/cell/ContentCell";
import { FooterCell } from "@/components/cell/FooterCell";
import { HeaderCell } from "@/components/cell/HeaderCell";
import { NewCell } from "@/components/cell/NewCell";
import prisma from "@/lib/prisma";
import { Eye } from "lucide-react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default async function Home() {
  const entries = await prisma.entry.findMany({
    include: {
      details: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <main className="h-screen p-4 flex flex-wrap gap-20">
      {entries
        .filter((entry) => {
          return entry.details.length > 0;
        })
        .map((entry) => (
          <div
            key={entry.id}
            className="w-[calc(100%/5)] h-[calc(100vw/5)] rounded-xl border-[0.5px] border-zinc-600 text-zinc-300 bg-zinc-700 overflow-y-auto flex flex-col items-center justify-between shadow-sm"
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
            <div className="w-full p-2 h-full">
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
                      <strong>
                        {new Intl.NumberFormat("pt-PT", {
                          style: "currency",
                          currency: "EUR",
                        }).format(details.amount)}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <FooterCell />
          </div>
        ))}
      <NewCell />
      <Entries />
    </main>
  );
}
