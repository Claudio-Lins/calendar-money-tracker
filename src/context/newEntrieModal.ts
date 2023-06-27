import { create } from "zustand";

type NewEntrieModalState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const initialState: NewEntrieModalState = {
  isOpen: false,
  setIsOpen: () => {},
};

export const useNewEntrieModal = create<NewEntrieModalState>((set) => ({
  ...initialState,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
