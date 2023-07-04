import { create } from "zustand";

type NewEntryState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  typeOfEntry: string;
  setTypeOfEntry: (typeOfEntry: string) => void;
  totalExpense: number;
  setTotalExpense: (totalExpense: number) => void;
  totalIncome: number;
  setTotalIncome: (totalIncome: number) => void;
};

const initialState: NewEntryState = {
  typeOfEntry: "",
  setTypeOfEntry: () => {},
  isOpen: false,
  setIsOpen: () => {},
  totalExpense: 0,
  setTotalExpense: () => {},
  totalIncome: 0,
  setTotalIncome: () => {},
};

export const useNewEntrie = create<NewEntryState>((set) => ({
  ...initialState,
  setIsOpen: (isOpen) => set({ isOpen }),
  setTypeOfEntry: (typeOfEntry) => set({ typeOfEntry }),
  setTotalExpense: (totalExpense) => set({ totalExpense }),
  setTotalIncome: (totalIncome) => set({ totalIncome }),
}));
