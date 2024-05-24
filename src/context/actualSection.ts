import { enumSections } from "@/config/sections";
import { create } from "zustand";

interface ActualSection {
  actualSection: enumSections;
  editMode: boolean;
  setActualSection: (actualSection: enumSections) => void;
  setEditMode: (editMode: boolean) => void;
}

export const useActiveSection = create<ActualSection>((set) => ({
  actualSection: enumSections._HOME_,
  editMode: false,
  setActualSection: (actualSection) => {
    set({ actualSection });
  },
  setEditMode: (editMode) => {
    set({ editMode });
  },
}));
