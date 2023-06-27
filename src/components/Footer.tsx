import { UserButton } from "@clerk/nextjs";
import React from "react";

export function Footer() {
  return (
    <div className="bg-zinc-900 flex w-full px-4 h-20 text-zinc-50 items-center justify-between">
      <div className="ml-4">© 2021</div>
      <small className="mr-4">Made by Claudio Lins</small>
      <div className="flex items-center">
        <UserButton />
      </div>
    </div>
  );
}
