"use client";
import { useNewEntrieModal } from "@/context/newEntrieModal";
import { Plus } from "lucide-react";
import React, { useState } from "react";

export function NewCell() {
  const { setIsOpen } = useNewEntrieModal();

  return (
    <div className="w-[calc(100%/5)] h-[calc(100vw/5)] rounded-xl border-[0.5px] border-zinc-600 text-zinc-300 bg-transparent  flex items-center justify-center hover:border-zinc-500 hover:brightness-125">
      <button
        onClick={() => setIsOpen(true)}
        className="p-4 text-zinc-500 border rounded-xl border-dashed border-zinc-500"
      >
        <Plus size={40} />
      </button>
    </div>
  );
}
