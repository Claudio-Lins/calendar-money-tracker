import { BtnDeleteEntry } from "@/components/cell/BtnDeleteEntry";
import prisma from "@/lib/prisma";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { BtnUpdateEntry } from "@/components/cell/BtnUpdateEntry";

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
    <div className=" flex flex-col items-center justify-center gap-4">
      <div className="overflow-x-auto w-full max-w-2xl rounded-lg border border-gray-400 dark:border-zinc-500 text-zinc-50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px] font-bold text-base">
                Description
              </TableHead>
              <TableHead className="w-[100px] font-bold text-base">
                Local
              </TableHead>
              <TableHead className="w-[100px] font-bold text-base">
                Type
              </TableHead>
              <TableHead className="w-[100px] font-bold text-base">
                Amount
              </TableHead>
              <TableHead className="w-[100px] font-bold text-base text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entry?.entryDetails.map((entryDetail, i) => {
              return (
                <>
                  <TableRow key={entryDetail.id}>
                    <TableCell className="font-medium">
                      {entryDetail.description}
                    </TableCell>
                    <TableCell>{entryDetail.locale}</TableCell>
                    <TableCell>{entryDetail.type}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("pt-PT", {
                        style: "currency",
                        currency: "EUR",
                      }).format(entryDetail.amount)}
                    </TableCell>
                    <TableCell className="flex items-center justify-center">
                      <BtnUpdateEntry entryDetails={entryDetail} />
                      <BtnDeleteEntry entry={entry} id={entryDetail.id}>
                        <Trash2 size={16} />
                      </BtnDeleteEntry>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <Button>
        <Link href={"/"}>Voltar</Link>
      </Button>
    </div>
  );
}
