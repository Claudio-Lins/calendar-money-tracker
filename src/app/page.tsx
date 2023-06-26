import { Modal } from "@/components/Modal";
import { Cell } from "@/components/cell/Cell";
import { NewCell } from "@/components/cell/NewCell";

export default function Home() {
  return (
    <main className="h-screen p-4 flex flex-wrap gap-20">
      <Cell />
      <NewCell />
      <Modal />
    </main>
  );
}
