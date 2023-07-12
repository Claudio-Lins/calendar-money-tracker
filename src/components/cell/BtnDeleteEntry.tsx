"use client";
import { EntryDetail } from "@/@types/EntryTypes";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { deleteEmptyEntry } from "@/lib/deleteEmptyEntry";
import { Button } from "../ui/button";

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
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const hasDetails = entry.entryDetails.length;

  async function deleteEmptyEntry(id: string) {
    if ((hasDetails as number) <= 1) {
      toast.success(`Toda entradas do dia excluídas com sucesso!`);
      router.push("/");
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
        setDeleting(true);
        deleteEmptyEntry(id);
        router.refresh();
        toast.success("Entrada excluída com sucesso!");
        setDeleting(false);
      } else {
        throw new Error("Erro ao excluir a entrada");
      }
    } catch (error) {
      toast.error("Erro ao excluir a entrada:");
    }
  };
  return (
    <Button
      variant={"ghost"}
      disabled={deleting}
      onClick={() => deleteEntry(String(id))}
      className=""
    >
      {children}
      {deleting && <RefreshCw size={16} className="animate-spin" />}
    </Button>
  );
}
