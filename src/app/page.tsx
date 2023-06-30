import { Entries } from "@/components/Entries";
import { Cell } from "@/components/cell/Cell";
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

  const totalExpense = entries
    .filter((entry) => {
      return entry.details.length > 0;
    })
    .map((entry) => {
      return {
        totalAmoutExpense: entry.details
          .filter((detail) => {
            return detail.type === "EXPENSE";
          })
          .reduce((acc, curr) => {
            return acc + curr.amount;
          }, 0),
      };
    });

  return (
    <main className="h-screen p-4 flex flex-wrap gap-20">
      {/* <pre>{JSON.stringify(totalExpense, null, 2)}</pre> */}
      <Cell entries={entries} />
      <NewCell />
      <Entries />
    </main>
  );
}
