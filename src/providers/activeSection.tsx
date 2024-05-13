"use client";
import { enumSections } from "../config/sections";
import { useActiveSection } from "../context/actualSection";

interface ActiveSectionProviderProps {
  children: React.ReactNode;
  section: enumSections;
}

export const ActiveSectionProvider = ({
  children,
  section,
}: ActiveSectionProviderProps) => {
  useActiveSection.setState({ actualSection: section });

  return children;
};
