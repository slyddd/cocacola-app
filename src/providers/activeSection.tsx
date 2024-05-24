"use client";
import { useActualFilter } from "@/context/actualFIlter";
import { enumSections } from "../config/sections";
import { useActiveSection } from "../context/actualSection";
import { useEffect } from "react";

interface ActiveSectionProviderProps {
  children: React.ReactNode;
  section: enumSections;
  editMode?: boolean;
}

export const ActiveSectionProvider = ({
  children,
  section,
  editMode: edit = false,
}: ActiveSectionProviderProps) => {
  const { setActualColumn, setActualFilter } = useActualFilter();
  const { setEditMode, setActualSection, actualSection, editMode } =
    useActiveSection();
  useEffect(() => {
    if (section !== actualSection) setActualSection(section);
    if (editMode !== edit) setEditMode(edit);

    setActualColumn("");
    setActualFilter("");
  }, [
    section,
    edit,
    editMode,
    actualSection,
    setActualColumn,
    setActualFilter,
    setActualSection,
    setEditMode,
  ]);

  return children;
};
