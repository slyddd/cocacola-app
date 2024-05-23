"use client";
import { useActualFilter } from "@/context/actualFIlter";
import { enumSections } from "../config/sections";
import { useActiveSection } from "../context/actualSection";

interface ActiveSectionProviderProps {
  children: React.ReactNode;
  section: enumSections;
  editMode?: boolean;
}

export const ActiveSectionProvider = ({
  children,
  section,
  editMode = false,
}: ActiveSectionProviderProps) => {
  useActiveSection.setState({ actualSection: section, editMode });
  useActualFilter.setState({ actualFilter: "", actualColumn: "" });
  return children;
};
