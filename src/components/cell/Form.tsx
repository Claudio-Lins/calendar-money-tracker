"use client";

import { useNewEntrie } from "@/context/entriesStore";
import { useModal } from "@/context/modalStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormDataProps {
  description?: string;
  amount: number | string;
  type: string;
  locale?: string;
  createdAt?: Date;
}
export function Form() {
  const router = useRouter();
  const { setIsOpen, typeOfEntry } = useNewEntrie();
  const {
    isSlideLeftOpen,
    isSlideRightOpen,
    setIsSlideLeftOpen,
    setIsSlideRightOpen,
  } = useModal();
  const [formData, setFormData] = useState<FormDataProps>({
    description: "",
    amount: "",
    type: typeOfEntry,
    locale: "",
    createdAt: new Date(),
  });

  async function criarEntry(formData: FormDataProps) {
    try {
      const entryDetailsResponse = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          entryDetails: {
            description: formData.description,
            amount: formData.amount,
            type: typeOfEntry,
            locale: formData.locale,
            createdAt: formData.createdAt,
          },
        }),
      });

      if (entryDetailsResponse.ok) {
        const entryDetailsData = await entryDetailsResponse.json();
        const entryDetails = entryDetailsData.entry.entryDetails;
        router.refresh();
        console.log("Detalhes adicionados à entrada existente:", entryDetails);
      } else {
        console.log(
          "Ocorreu um erro ao adicionar detalhes à entrada existente."
        );
        router.refresh();
      }
    } catch (error) {
      console.error("Ocorreu um erro ao processar a solicitação:", error);
    }
  }

  async function handleCreateEntry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    criarEntry(formData);
    setIsOpen(false);
    setFormData({
      description: "",
      amount: "",
      type: "",
      locale: "",
    });
  }

  return (
    <form onSubmit={handleCreateEntry} className="flex flex-col">
      {/* date */}
      <div className="flex flex-col">
        <input
          type="date"
          placeholder="Data"
          value={
            formData.createdAt
              ? new Date(formData.createdAt).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0]
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              createdAt: new Date(e.target.value),
            })
          }
        />
      </div>
      <div className="flex flex-col">
        <input
          type="text"
          name="description"
          id="description"
          placeholder="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col">
        <input
          type="text"
          name="locale"
          placeholder="Local"
          value={formData.locale}
          onChange={(e) => setFormData({ ...formData, locale: e.target.value })}
        />
      </div>
      <div className="flex flex-col">
        <input
          type="number"
          name="amount"
          placeholder="Valor"
          value={formData.amount}
          onChange={(e) =>
            setFormData({
              ...formData,
              amount: Number(e.target.value),
            })
          }
        />
      </div>
      <div className="flex flex-col">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}
