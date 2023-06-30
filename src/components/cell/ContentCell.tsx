import { Entry, EntryDetails } from "@prisma/client";
import { EntryTypes } from "@/@types/EntryTypes";
import { Eye } from "lucide-react";
import React from "react";

export function ContentCell({ entries }: EntryTypes) {
  return (
    <table className="min-w-full text-zinc-300 text-xs">
      <tbody className="">
        {entries?.map((entry) => (
          <tr
            key={entry.id}
            className={`
            border-b-[0.5px] border-zinc-500
            `}
          >
            {entry.details.map((entryDetails) => (
              <>
                <td
                  key={entryDetails.id}
                  className="w-full py-2 whitespace-nowrap"
                >
                  {entryDetails.description}
                </td>
                <td className={` w-full py-2 whitespace-nowrap`}>
                  {new Intl.NumberFormat("pt-PT", {
                    style: "currency",
                    currency: "EUR",
                  }).format(entryDetails.amount)}
                </td>
                <td className="w-full py-2 whitespace-nowrap">
                  <Eye size={12} />
                </td>
              </>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
