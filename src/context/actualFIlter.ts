import { create } from "zustand";

interface ActualFilter {
  actualFilter: string;
  actualColumn: string;
  setActualFilter: (actualFilter: string) => void;
  setActualColumn: (actualColumn: string) => void;
}

export const useActualFilter = create<ActualFilter>((set) => ({
  actualFilter: "",
  actualColumn: "",
  setActualFilter: (actualFilter) => {
    set({ actualFilter });
  },
  setActualColumn: (actualColumn) => {
    set({ actualColumn });
  },
}));
