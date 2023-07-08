"use client";

import { useNewEntrie } from "@/context/entriesStore";
import { useModal } from "@/context/modalStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

const createEntryFormSchema = z.object({
  description: z.string().nonempty("A descrição é obrigátoria"),
  amount: z.number().optional(),
  type: z.string().optional(),
  locale: z.string().optional(),
  createdAt: z.date().optional(),
});

interface FormDataProps {
  description?: string;
  amount: number | string;
  type: string;
  locale?: string;
  createdAt?: Date | string;
}
export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createEntryFormSchema),
  });
  const router = useRouter();
  const { typeOfEntry } = useNewEntrie();
  const {
    setIsOpen,
    setIsSlideLeftOpen,
    setIsSlideRightOpen,
    setFormExpense,
    setFormIncome,
  } = useModal();

  const [formData, setFormData] = useState<FormDataProps>({
    description: "",
    amount: "",
    type: typeOfEntry,
    locale: "",
    createdAt: new Date(),
  });

  function resetSlide() {
    setIsSlideLeftOpen(false);
    setIsSlideRightOpen(false);
    setFormExpense(false);
    setFormIncome(false);
  }

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
      }
    } catch (error) {
      console.error("Ocorreu um erro ao processar a solicitação:", error);
    }
  }

  async function handleCreateEntry(formData: any) {
    criarEntry(formData);
    toast.success("Entrada criada com sucesso!");
    setIsOpen(false);
    resetSlide();
  }

  return (
    <form onSubmit={handleSubmit(handleCreateEntry)} className="flex flex-col">
      <div className="flex flex-col">
        <input
          type="date"
          placeholder="Data"
          {...register("createdAt", {
            valueAsDate: true,
          })}
        />
        {errors.createdAt && <span>{errors.createdAt.message}</span>}
      </div>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="description"
          {...register("description")}
        />
        {errors.description && (
          <span className="text-[10px]">{errors.description.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <input type="text" placeholder="Local" {...register("locale")} />
        {errors.locale && <span>{errors.locale.message}</span>}
      </div>
      <div className="flex flex-col">
        <input
          type="number"
          placeholder="Valor"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && <span>{errors.amount.message}</span>}
      </div>
      <div className="flex flex-col">
        <button
          className="px-2 py-1 bg-zinc-700 rounded-lg shadow mt-4 text-zinc-100"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  );
}
