import { Modal } from "@/components/Modal";
import { BtnDeleteEntry } from "@/components/cell/BtnDeleteEntry";
import prisma from "@/lib/prisma";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

type EntryProps = {
  params: {
    id: string;
  };
};

export default async function Entry({ params: { id } }: EntryProps) {
  const entry = await prisma.entry.findUnique({
    where: {
      id: String(id),
    },
    include: {
      entryDetails: true,
    },
  });

  const entryDetails = await prisma.entryDetails.findUnique({
    where: {
      id: String(id),
    },
  });

  return (
    <div className="text-white flex pt-10 justify-center w-full h-screen">
      <div className="">
        <h1>
          {new Intl.DateTimeFormat("pt", {
            dateStyle: "medium",
          }).format(entry?.entryDetails[0]?.createdAt)}
        </h1>
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-zinc-500">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Description
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Local
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Type
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Amount
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {entry?.entryDetails.map((entryDetail, i) => {
                return (
                  <>
                    <tr
                      key={entryDetail.id}
                      className={`
                        hover:bg-zinc-950
                      ${i % 2 === 0 ? "bg-zinc-700" : "bg-zinc-800"}`}
                    >
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                        {entryDetail.description}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                        {entryDetail.locale}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                        {entryDetail.type}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                        {new Intl.NumberFormat("pt-PT", {
                          style: "currency",
                          currency: "EUR",
                        }).format(entryDetail.amount)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-200 flex items-center gap-2">
                        <button>
                          <Pencil size={16} />
                        </button>
                        <BtnDeleteEntry entry={entry} id={entryDetail.id}>
                          <Trash2 size={16} />
                        </BtnDeleteEntry>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <Link href={"/"}>Voltar</Link>
      </div>
    </div>
  );
}
