"use client";
import React from "react";
import { EntryTypes } from "@/@types/EntryTypes";

export function CheckEntry({ entries }: EntryTypes) {
  const hasEntryDetails = entries.some((entry) => entry.entryDetails.length);
  async function deleteEmptyEntry() {
    if (!hasEntryDetails) {
      await fetch(`/api/entries`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: entries[0].id }),
      });
    }
  }

  return <button onClick={deleteEmptyEntry}>Delete</button>;
}

// if ((hasDetails as number) <= 1) {
//     toast.success(`Toda entradas do dia excluídas com sucesso!`);
//     router.push("/");
//     const response = await fetch(`/api/entries`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id }),
//     });
//     if (response.ok) {
//       toast.success("Toda entradas excluídas com sucesso!");
//       console.log(response);
//     }
//   }
