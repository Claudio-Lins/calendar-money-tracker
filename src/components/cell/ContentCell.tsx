import { Eye } from "lucide-react";
import React from "react";

export function ContentCell() {
  return (
    <table className="min-w-full text-zinc-300 text-xs">
      <tbody className="">
        <tr className="border-b-[0.5px] border-zinc-500">
          <td className="w-full py-2 whitespace-nowrap">Product 1</td>
          <td className="w-full py-2 whitespace-nowrap">100</td>
          <td className="w-full py-2 whitespace-nowrap">
            <Eye size={12} />
          </td>
        </tr>
        <tr className="border-b-[0.5px] border-zinc-500">
          <td className="w-full py-2 whitespace-nowrap">Product 1</td>
          <td className="w-full py-2 whitespace-nowrap">100</td>
          <td className="w-full py-2 whitespace-nowrap">
            <Eye size={12} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
