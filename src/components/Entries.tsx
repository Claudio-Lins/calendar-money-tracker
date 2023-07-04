"use client";
import React, { useState } from "react";
import { Modal } from "./Modal";
import { useNewEntrie } from "@/context/entriesStore";
import { Form } from "./cell/Form";

export function Entries() {
  const [formExpense, setFormExpense] = useState(false);
  const [formIncome, setFormIncome] = useState(false);
  const { setIsOpen, isOpen } = useNewEntrie();
  return (
    <Modal
      formExpense={formExpense}
      setFormExpense={setFormExpense}
      formIncome={formIncome}
      setFormIncome={setFormIncome}
      setStatusModal={(status: boolean) => setIsOpen(status)}
    >
      <Form />
    </Modal>
  );
}
