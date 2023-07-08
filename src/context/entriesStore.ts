import { create } from "zustand";

type NewEntryState = {
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
  totalExpense: 0,
  setTotalExpense: () => {},
  totalIncome: 0,
  setTotalIncome: () => {},
};

export const useNewEntrie = create<NewEntryState>((set) => ({
  ...initialState,

  setTypeOfEntry: (typeOfEntry) => set({ typeOfEntry }),
  setTotalExpense: (totalExpense) => set({ totalExpense }),
  setTotalIncome: (totalIncome) => set({ totalIncome }),
}));
