"use client";
import { EntryDetail, EntryElement, EntryTypes } from "@/@types/EntryTypes";
import { Entry } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { toast } from "react-hot-toast";

interface BtnDeleteEntryPorps {
  id: string;
  children?: ReactNode | undefined;
  entry: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    entryDetails: EntryDetail[];
  };
}

export async function BtnDeleteEntry({
  entry,
  children,
  id,
}: BtnDeleteEntryPorps) {
  const router = useRouter();

  const hasDetails = entry.entryDetails.length;

  async function deleteEmptyEntry(id: string) {
    console.log(hasDetails);
    if ((hasDetails as number) <= 1) {
      toast.success(
        `Toda entradas do dia ${entry?.createdAt} excluídas com sucesso!`
      );
      router.push("/");
      // const response = await fetch(`/api/entries`, {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ id }),
      // });
      // if (response.ok) {
      //   toast.success("Toda entradas excluídas com sucesso!");
      //   console.log(response);
      // }
    }
  }

  const deleteEntry = async (id: string) => {
    try {
      const response = await fetch(`/api/entryDetails`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        deleteEmptyEntry(id);
        router.refresh();
        toast.success("Entrada excluída com sucesso!");
      } else {
        throw new Error("Erro ao excluir a entrada");
      }
    } catch (error) {
      toast.error("Erro ao excluir a entrada:");
    }
  };
  return <button onClick={() => deleteEntry(String(id))}>{children}</button>;
}
