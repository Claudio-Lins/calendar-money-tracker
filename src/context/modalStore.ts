import { create } from "zustand";

type ModalState = {
  isSlideLeftOpen: boolean;
  setIsSlideLeftOpen: (isOpen: boolean) => void;
  isSlideRightOpen: boolean;
  setIsSlideRightOpen: (isOpen: boolean) => void;
  esquerda: string;
  setEsquerda: (esquerda: string) => void;
  direita: string;
  setDireita: (direita: string) => void;
  formExpense: boolean;
  setFormExpense: (formExpense: boolean) => void;
  formIncome: boolean;
  setFormIncome: (formIncome: boolean) => void;
};

const initialState: ModalState = {
  isSlideLeftOpen: false,
  setIsSlideLeftOpen: () => {},
  isSlideRightOpen: false,
  setIsSlideRightOpen: () => {},
  esquerda: "",
  setEsquerda: () => {},
  direita: "",
  setDireita: () => {},
  formExpense: false,
  setFormExpense: () => {},
  formIncome: false,
  setFormIncome: () => {},
};

export const useModal = create<ModalState>((set) => ({
  ...initialState,
  setIsSlideLeftOpen: (isSlideLeftOpen) =>
    set({ isSlideLeftOpen: isSlideLeftOpen }),
  setIsSlideRightOpen: (isSlideRightOpen) =>
    set({ isSlideRightOpen: isSlideRightOpen }),
  setEsquerda: (esquerda) => set({ esquerda: esquerda }),
  setDireita: (direita) => set({ direita: direita }),
  setFormExpense: (formExpense) => set({ formExpense: formExpense }),
  setFormIncome: (formIncome) => set({ formIncome: formIncome }),
}));
