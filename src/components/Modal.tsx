"use client";

import { ArrowDownCircle, ArrowUpCircle, X } from "lucide-react";
import React, { useState } from "react";

export function Modal() {
  const [isSlideLeftOpen, setIsSlideLeftOpen] = useState(false);
  const [isSlideRightOpen, setIsSlideRightOpen] = useState(false);
  const [formExpense, setFormExpense] = useState(false);
  const [formIncome, setFormIncome] = useState(false);

  function resetSlide() {
    setIsSlideLeftOpen(false);
    setIsSlideRightOpen(false);
    setFormExpense(false);
    setFormIncome(false);
  }

  return (
    <div className="w-full h-screen backdrop-blur-sm flex justify-center items-center absolute inset-0">
      <div className="w-full max-w-2xl rounded-lg bg-white overflow-hidden">
        <div className="relative w-full bg-white h-96">
          <div
            onClick={() => {
              setIsSlideLeftOpen(!isSlideLeftOpen);
              setFormExpense(true);
            }}
            className={`
          absolute w-1/2 bg-red-500 h-full flex items-center justify-center transition-all duration-1000 flex-col  cursor-pointer group
          ${isSlideLeftOpen ? "-left-[42.5%]" : "left-0"}
          ${formIncome && "-left-[50%]"}
          `}
          >
            <ArrowDownCircle
              size={45}
              strokeWidth={1}
              className={`
                 text-white group-hover:animate-bounce
                ${
                  isSlideLeftOpen &&
                  "transition-all duration-1000 absolute right-1 top-1"
                }
                `}
            />
            <span className="font-bold text-white text-xl">Despesas</span>
          </div>
          <button
            onClick={() => resetSlide()}
            className={`
                absolute left-0 text-white text-2xl h-full w-12 flex items-end justify-center pb-4
                ${!isSlideLeftOpen && "invisible"}    
            `}
          >
            <X size={24} className="text-white" />
          </button>
          <div
            onClick={() => {
              setIsSlideRightOpen(!isSlideRightOpen);
              setFormIncome(true);
            }}
            className={`
            absolute w-1/2 bg-blue-500 h-full flex flex-col items-center justify-center cursor-pointer
            transition-all duration-1000 group
            ${isSlideRightOpen ? "-right-[42.5%]" : "right-0"}
            ${formExpense && "-right-[50%]"}
          `}
          >
            <ArrowUpCircle
              size={45}
              strokeWidth={1}
              className={`
               text-white group-hover:animate-bounce
            ${
              isSlideRightOpen &&
              "transition-all duration-1000 absolute left-1 top-1"
            }
            `}
            />
            <span className="font-bold text-white text-xl">Entradas</span>
          </div>
          <button
            onClick={() => resetSlide()}
            className={`
                absolute right-0 text-white text-2xl h-full w-12 flex items-end justify-center pb-4
                ${!isSlideRightOpen && "invisible"}    
            `}
          >
            <X size={24} className="text-white" />
          </button>
          <div className="w-full h-full flex justify-center items-center">
            {formExpense && "Form Expense"}
            {formIncome && "Form Income"}
          </div>
        </div>
      </div>
    </div>
  );
}
