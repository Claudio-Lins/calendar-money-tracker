import { Entries } from "@/components/Entries";
import { Cell } from "@/components/cell/Cell";
import { NewCell } from "@/components/cell/NewCell";
import prisma from "@/lib/prisma";

export default async function Home() {
  const entries = await prisma.entry.findMany({
    include: {
      details: true,
    },
  });
  console.log(entries);
  return (
    <main className="h-screen p-4 flex flex-wrap gap-20">
      {/* @ts-ignore */}
      <Cell entries={entries} />
      <NewCell />
      <Entries />
    </main>
  );
}
