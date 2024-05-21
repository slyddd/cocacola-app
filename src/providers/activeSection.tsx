"use client";
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

  return children;
};
