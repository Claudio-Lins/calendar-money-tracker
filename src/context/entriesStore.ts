import { create } from "zustand";

type NewEntryState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  typeOfEntry: string;
  setTypeOfEntry: (typeOfEntry: string) => void;
};

const initialState: NewEntryState = {
  typeOfEntry: "",
  setTypeOfEntry: () => {},
  isOpen: false,
  setIsOpen: () => {},
};

export const useNewEntrie = create<NewEntryState>((set) => ({
  ...initialState,
  setIsOpen: (isOpen) => set({ isOpen }),
  setTypeOfEntry: (typeOfEntry) => set({ typeOfEntry }),
}));
