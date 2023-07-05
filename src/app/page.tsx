import { Entries } from "@/components/Entries";
import { Cell } from "@/components/cell/Cell";
import { NewCell } from "@/components/cell/NewCell";
import { getEntries } from "@/lib/fetchs";
import prisma from "@/lib/prisma";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/entries`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  }).then((res) => res.json());
  const data = res.entries;

  // const entries = await prisma.entry.findMany({
  //   include: {
  //     entryDetails: true,
  //   },
  //   orderBy: {
  //     createdAt: "asc",
  //   },
  // });
  return (
    <main className="h-screen p-4 flex flex-wrap gap-4">
      <Cell entries={data} />
      <NewCell />
      <Entries />
      {/* <pre className="text-white">{JSON.stringify(entries, null, 2)}</pre> */}
    </main>
  );
}
