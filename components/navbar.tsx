import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import { Kbd } from "@nextui-org/kbd";

import { ThemeSwitch } from "@/components/theme-switch";

import { Logo } from "@/components/icons";
import { Divider } from "@nextui-org/divider";
import { FaUser } from "react-icons/fa";

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="" justify="start">
        <NavbarBrand as="li" className="max-w-fit gap-3">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <Logo size={70} />
            <p className="text-sm font-bold text-inherit">Inventario</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="" justify="center">
        <p>Home</p>
        <Divider orientation="vertical" className="h-1/2" />
        <div className="flex items-center justify-center gap-2">
          <FaUser />
          <p>user</p>
        </div>
      </NavbarContent>

      <NavbarContent className="" justify="end">
        <button className="hover:opacity-70">
          <Kbd keys={["command"]}>k para busqueda y opciones</Kbd>
        </button>
        <ThemeSwitch />
      </NavbarContent>
    </NextUINavbar>
  );
};
