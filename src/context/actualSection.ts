import { enumSections } from "@/config/sections";
import { create } from "zustand";

interface ActualSection {
  actualSection: enumSections;
}

export const useActiveSection = create<ActualSection>(() => ({
  actualSection: enumSections._HOME_,
}));
