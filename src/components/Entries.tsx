"use client";
import React, { useState } from "react";
import { Modal } from "./Modal";
import { useNewEntrieModal } from "@/context/newEntrieModal";
import { Form } from "./cell/Form";

export function Entries() {
  const [formExpense, setFormExpense] = useState(false);
  const [formIncome, setFormIncome] = useState(false);
  const { setIsOpen, isOpen } = useNewEntrieModal();
  return (
    <Modal
      formExpense={formExpense}
      setFormExpense={setFormExpense}
      formIncome={formIncome}
      setFormIncome={setFormIncome}
      setStatusModal={(status: boolean) => setIsOpen(status)}
    >
      {formExpense && <Form />}
      {formIncome && "Form Income"}
    </Modal>
  );
}
