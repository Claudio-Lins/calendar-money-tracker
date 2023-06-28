import { useNewEntrieModal } from "@/context/newEntrieModal";
import { ArrowDownCircle, ArrowUpCircle, X } from "lucide-react";
import React, { ReactNode, useState } from "react";
interface ModalProps {
  formExpense: boolean;
  setFormExpense: React.Dispatch<React.SetStateAction<boolean>>;
  formIncome: boolean;
  setFormIncome: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  setStatusModal: (status: boolean) => void;
  children: ReactNode;
}

export function Modal({
  setStatusModal,
  formExpense,
  setFormExpense,
  formIncome,
  setFormIncome,
  children,
}: ModalProps) {
  const { setIsOpen, isOpen } = useNewEntrieModal();
  const [isSlideLeftOpen, setIsSlideLeftOpen] = useState(false);
  const [isSlideRightOpen, setIsSlideRightOpen] = useState(false);

  function handleModalStatus(e: any) {
    if (e.target.classList.contains("modalBg")) {
      setStatusModal(false);
    }
  }

  function resetSlide() {
    setIsSlideLeftOpen(false);
    setIsSlideRightOpen(false);
    setFormExpense(false);
    setFormIncome(false);
  }

  return (
    <>
      {isOpen ? (
        <div
          onClick={handleModalStatus}
          className=" modalBg w-full h-screen backdrop-blur-sm flex justify-center items-center absolute inset-0"
        >
          <button
            className="absolute right-4 top-4 text-2xl text-white"
            onClick={() => {
              setIsOpen(false);
              resetSlide();
            }}
          >
            <X size={24} color="#ffffff" />
          </button>
          <div className="w-full max-w-2xl rounded-lg bg-white overflow-hidden">
            <div className="relative w-full bg-white h-96">
              <div
                onClick={() => {
                  setIsSlideLeftOpen(!isSlideLeftOpen);
                  setFormExpense(true);
                }}
                className={`
          absolute w-1/2 bg-red-500 h-full flex items-center justify-center transition-all duration-1000 flex-col  cursor-pointer group
          ${isSlideLeftOpen ? "-left-72" : "left-0"}
          ${formIncome ? "-left-96" : ""}
          `}
              >
                <ArrowDownCircle
                  size={40}
                  strokeWidth={1}
                  className={`
                 text-white group-hover:animate-bounce transition-all duration-1000
                ${isSlideLeftOpen && " absolute right-1.5 top-1"}
                `}
                />
                <span
                  className={`font-bold text-white text-xl transition-all duration-700 ${
                    isSlideLeftOpen && "hidden "
                  }`}
                >
                  Despesas
                </span>
              </div>
              <button
                onClick={() => resetSlide()}
                className={`
            absolute text-white text-2xl h-full w-12 flex flex-col items-center justify-end gap-32 pb-4
            ${!isSlideLeftOpen && "invisible"}    
            `}
              >
                <p className="rotate-90 tracking-wider">Despesas</p>
                <X size={24} className="" />
              </button>
              <div
                onClick={() => {
                  setIsSlideRightOpen(!isSlideRightOpen);
                  setFormIncome(true);
                }}
                className={`
            absolute w-1/2 bg-blue-500 h-full flex flex-col items-center justify-center cursor-pointer
            transition-all duration-1000 group
            ${isSlideRightOpen ? "-right-72" : "right-0"}
            ${formExpense ? "-right-96" : ""}
          `}
              >
                <ArrowUpCircle
                  size={40}
                  strokeWidth={1}
                  className={`
               text-white group-hover:animate-bounce
            ${
              isSlideRightOpen &&
              "transition-all duration-1000 absolute left-1.5 top-1"
            }
            `}
                />
                <span
                  className={`font-bold text-white text-xl ${
                    isSlideRightOpen && "hidden"
                  }`}
                >
                  Entradas
                </span>
              </div>
              <button
                onClick={() => resetSlide()}
                className={`
            absolute right-0 text-white text-2xl h-full w-12 flex flex-col items-center justify-end gap-32 pb-4
                ${!isSlideRightOpen && "invisible"}    
            `}
              >
                <p className="rotate-90 tracking-wider">Entradas</p>
                <X size={24} className="" />
              </button>
              <div className="w-full h-full flex justify-center items-center">
                {children}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
