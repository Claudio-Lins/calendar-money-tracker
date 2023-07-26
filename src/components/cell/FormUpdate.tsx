import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Euro, MapPin, MenuSquare } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { EntryDetailTypes } from "@/@types/EntryDetailsTypes";

const schema = z.object({
  description: z.string().nonempty("A descrição é obrigatória"),
  amount: z.number().positive("O valor deve ser positivo"),
  type: z.string().default("EXPENSE"),
  locale: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
});

interface FormUpdatePorps {
  entryDetails: EntryDetailTypes;
}

export const FormUpdate = ({ entryDetails }: FormUpdatePorps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      description: entryDetails.description,
      amount: entryDetails.amount,
      type: entryDetails.type,
      locale: entryDetails.locale,
      createdAt: entryDetails.createdAt,
    },
  });

  const updateEntryDetails = async (data: EntryDetailTypes) => {
    try {
      const response = await fetch(`/api/entries`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("TROW");
      }

      // Lógica adicional após a atualização bem-sucedida
    } catch (error) {
      console.error(error);
      // Lógica para lidar com erro durante a atualização
    }
  };

  const onSubmit = (data: any) => {
    updateEntryDetails(data);
  };

  // Atualizar os valores do React Hook Form quando os dados externos são alterados
  useEffect(() => {
    setValue("description", entryDetails.description);
    setValue("amount", entryDetails.amount);
    setValue("type", entryDetails.type);
    setValue("locale", entryDetails.locale);
    setValue("createdAt", entryDetails.createdAt);
  }, [entryDetails, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <Input
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
        <Input
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
        <Input
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
        <Input
          id="Amount"
          type="number"
          step=".01"
          placeholder="Valor"
          className="w-full rounded-md border-none sm:text-sm focus:right-0"
          {...register("amount", { valueAsNumber: true })}
        />
        <span className="pointer-events-none w-10 place-content-center text-gray-500">
          <Euro size={16} />
        </span>
      </div>
      {entryDetails.id}
      <div className="flex flex-col">
        <Button
          className="px-2 py-1 bg-zinc-700 rounded-lg shadow mt-4 text-zinc-100"
          type="submit"
        >
          Create
        </Button>
      </div>
    </form>
  );
};
