"use client";
import { FiPackage } from "react-icons/fi";
import { FaHandHoldingDroplet, FaTruckFast } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import Link from "next/link";
import { Tooltip } from "@nextui-org/tooltip";
import { useActiveSection } from "@/context/actualSection";
import { enumSections } from "@/config/sections";

export const Aside = () => {
  const { actualSection } = useActiveSection();

  return (
    <aside className="flex h-full w-[6%] flex-col items-center justify-between py-20 text-3xl [&>*:hover]:text-accent [&>*:hover]:opacity-70 [&>*]:transition-all">
      <Tooltip content="Materia Prima" placement="right">
        <Link href="/materials">
          <FiPackage
            className={
              actualSection === enumSections._MATERIALS_ ? "text-accent" : ""
            }
          />
        </Link>
      </Tooltip>

      <Tooltip content="Proveedores" placement="right">
        <Link href="/distributor">
          <FaHandHoldingDroplet
            className={
              actualSection === enumSections._PROVIDERS_ ? "text-accent" : ""
            }
          />
        </Link>
      </Tooltip>

      <Tooltip content="Transportistas" placement="right">
        <Link href="/transportist">
          <FaTruckFast
            className={
              actualSection === enumSections._TRANSPORTIST_ ? "text-accent" : ""
            }
          />
        </Link>
      </Tooltip>

      <Tooltip content="Empleados" placement="right">
        <Link href="/employees">
          <FaUserTie
            className={
              actualSection === enumSections._EMPLOYEES_ ? "text-accent" : ""
            }
          />
        </Link>
      </Tooltip>
    </aside>
  );
};
