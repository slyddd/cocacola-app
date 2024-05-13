"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import { Kbd } from "@nextui-org/kbd";
import { Divider } from "@nextui-org/divider";
import { FaUser } from "react-icons/fa";
import { useEffect, useRef } from "react";

import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import { useBlurActions } from "@/context/blurActions";
import { enumSections } from "@/config/sections";
import { useActiveSection } from "@/context/actualSection";

export const Navbar = () => {
  const { setBlur } = useBlurActions();
  const { actualSection } = useActiveSection();

  useEffect(() => {
    if (actualSection === enumSections._HOME_) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && e.ctrlKey) {
        e.preventDefault();
        setBlur(true);
      }

      if (e.key === "Escape" || e.key === "Enter") {
        setBlur(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent justify="start">
        <NavbarBrand as="li" className="max-w-fit gap-3">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <Logo size={70} />
            <p className="text-sm font-bold text-inherit">Inventario</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center">
        <p>{actualSection}</p>
        <Divider orientation="vertical" className="h-1/2" />
        <div className="flex items-center justify-center gap-2">
          <FaUser />
          <p>user</p>
        </div>
      </NavbarContent>

      <NavbarContent justify="end">
        {actualSection !== enumSections._HOME_ ? (
          <button className="hover:opacity-70" onClick={() => setBlur(true)}>
            <Kbd keys={["command"]}>k para busqueda y opciones</Kbd>
          </button>
        ) : (
          <></>
        )}
        <ThemeSwitch />
      </NavbarContent>
    </NextUINavbar>
  );
};
