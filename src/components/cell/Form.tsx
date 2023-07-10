"use client";
import { InputFloatLabel, InputSimple } from "@claudiolins-dev/claudiolins-lib";
import { useNewEntrie } from "@/context/entriesStore";
import { useModal } from "@/context/modalStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { CheckCheck, Euro, MapPin, MenuSquare } from "lucide-react";

const createEntryFormSchema = z.object({
  description: z
    .string()
    .nonempty("A descrição é obrigátoria")
    .min(4, "Minimo de 3 caracteres"),
  amount: z.number().positive("O valor deve ser positivo"),
  type: z.string().default("EXPENSE"),
  locale: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
});

type createEntryFormData = z.infer<typeof createEntryFormSchema>;

interface FormDataProps {
  description?: string;
  amount: number;
  type: string;
  locale?: string;
  createdAt?: Date;
}
export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createEntryFormData>({
    resolver: zodResolver(createEntryFormSchema),
    defaultValues: {
      description: "",
      type: "EXPENSE",
      locale: "",
      createdAt: new Date(),
    },
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
    amount: 0,
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
  errors.amount && toast.error(` ${errors.amount.message}`);
  errors.description && toast.error(`${errors.description.message}`);

  return (
    <form onSubmit={handleSubmit(handleCreateEntry)} className="flex flex-col">
      <div className="flex flex-col">
        <input
          type="date"
          placeholder="Data"
          className="w-full rounded-md border-zinc-200 sm:text-sm text-zinc-500"
          {...register("createdAt", {
            valueAsDate: true,
          })}
        />
      </div>

      <div className="flex items-center border rounded-lg mt-2">
        <label htmlFor="Descrição" className="sr-only">
          Descrição
        </label>
        <input
          id="Descrição"
          type="text"
          placeholder="description"
          className="w-full rounded-md border-none sm:text-sm"
          {...register("description")}
        />
        <span className="pointer-events-none w-10 place-content-center text-gray-500">
          <MenuSquare size={16} />
        </span>
      </div>
      <div className="flex items-center border rounded-lg mt-2">
        <label htmlFor="Local" className="sr-only">
          Local
        </label>
        <input
          type="text"
          id="Local"
          placeholder="Local"
          className="w-full rounded-md border-none sm:text-sm"
          {...register("locale")}
        />
        <span className="pointer-events-none w-10 place-content-center text-gray-500">
          <MapPin size={16} />
        </span>
        {errors.locale && toast.error(` ${errors.locale.message}`)}
      </div>
      <div className="flex items-center border rounded-lg mt-2">
        <label htmlFor="Amoutn" className="sr-only">
          Amount
        </label>
        <input
          id="Amount"
          type="number"
          step=".01"
          placeholder="Valor"
          className="w-full rounded-md border-none sm:text-sm"
          {...register("amount", { valueAsNumber: true })}
        />
        <span className="pointer-events-none w-10 place-content-center text-gray-500">
          <Euro size={16} />
        </span>
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
