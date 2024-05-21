import { enumSections } from "@/config/sections";
import { create } from "zustand";

interface ActualSection {
  actualSection: enumSections;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
}

export const useActiveSection = create<ActualSection>((set) => ({
  actualSection: enumSections._HOME_,
  editMode: false,
  setEditMode: (editMode) => {
    set({ editMode });
  },
}));
