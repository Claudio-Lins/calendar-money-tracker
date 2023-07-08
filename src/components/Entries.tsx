"use client";
import { Modal } from "./Modal";
import { Form } from "./cell/Form";
import { useModal } from "@/context/modalStore";

export function Entries() {
  const { setIsOpen } = useModal();
  return (
    <Modal setStatusModal={setIsOpen}>
      <Form />
    </Modal>
  );
}
