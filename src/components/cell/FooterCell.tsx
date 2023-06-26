import React from "react";

export function FooterCell() {
  return (
    <div className="w-full flex items-center justify-between bg-zinc-800 px-2 h-12">
      <div className="text-sm text-red-600 font-semibold">234,99</div>
      <div className="text-lg text-white font-bold">744,99</div>
      <div className="text-sm text-blue-600 font-semibold">444,99</div>
    </div>
  );
}
