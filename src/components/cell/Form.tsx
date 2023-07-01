"use client";

import { useState } from "react";

interface FormDataProps {
  description?: string;
  amount: number;
  type: string;
  locale?: string;
}
export function Form() {
  const [formData, setFormData] = useState<FormDataProps>({
    description: "",
    amount: 0,
    type: "INCOME",
    locale: "",
  });

  async function criarEntry(formData: FormDataProps) {
    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          details: {
            description: formData.description,
            amount: formData.amount,
            type: formData.type,
            locale: formData.locale,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Nova entrada criada:", data.entrie);
      } else {
        console.log("Ocorreu um erro ao criar a entrada.");
      }
    } catch (error) {
      console.error("Ocorreu um erro ao processar a solicitação:", error);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        criarEntry(formData);
      }}
      className="flex flex-col"
    >
      {/* date */}
      {/* <div className="flex flex-col">
        <input 
            type="date" 
            name="date"
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
      </div> */}
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
        <select
          name="type"
          id="type"
          placeholder="Tipo"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </select>
      </div>
      <div className="flex flex-col">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}
