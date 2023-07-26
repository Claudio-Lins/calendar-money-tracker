"use client";
import { EntryDetail } from "@/@types/EntryTypes";
import { RefreshCw, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormUpdate } from "./FormUpdate";

interface BtnUpdateEntryPorps {
  entryDetails: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    amount: number;
    type: string;
    locale: string;
    entryId: string;
  };
}

export async function BtnUpdateEntry({ entryDetails }: BtnUpdateEntryPorps) {
  const router = useRouter();

  const updateEntry = async (id: string) => {
    try {
      const response = await fetch(`/api/entryDetails`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        router.refresh();
        toast.success("Entrada excluída com sucesso!");
      } else {
        throw new Error("Erro ao excluir a entrada");
      }
    } catch (error) {
      toast.error("Erro ao excluir a entrada:");
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Pencil size={16} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{entryDetails.description}</DialogTitle>
          <DialogDescription>
            <FormUpdate entryDetails={entryDetails} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
