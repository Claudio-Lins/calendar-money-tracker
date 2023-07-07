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

  return (
    <main className="min-h-[calc(100vh+200px)] pb-24 pt-4 flex flex-wrap gap-12 justify-center">
      <Cell entries={data} />
      <NewCell />
      <Entries />
      {/* <pre className="text-white">{JSON.stringify(entries, null, 2)}</pre> */}
    </main>
  );
}
