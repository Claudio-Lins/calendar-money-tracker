import { EntrieTypes } from "@/@types/EntrieTypes";
import { Eye } from "lucide-react";
import React from "react";
interface ContentCellProps {
  entries: EntrieTypes[];
}

export function ContentCell({ entries }: ContentCellProps) {
  return (
    <table className="min-w-full text-zinc-300 text-xs">
      <tbody className="">
        {entries?.map((entry) => (
          <tr key={entry.id} className="border-b-[0.5px] border-zinc-500">
            <td className="w-full py-2 whitespace-nowrap">{entry.title}</td>
            <td className="w-full py-2 whitespace-nowrap">
              {new Intl.NumberFormat("pt-PT", {
                style: "currency",
                currency: "EUR",
              }).format(entry.amount / 100)}
            </td>
            <td className="w-full py-2 whitespace-nowrap">
              <Eye size={12} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
