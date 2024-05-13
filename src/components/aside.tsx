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
    <aside className="[&>*:hover]:text-accent flex h-full w-[6%] flex-col items-center justify-between py-20 text-3xl [&>*:hover]:opacity-70 [&>*]:transition-all">
      <Link href="/materials">
        <Tooltip content="Materia Prima" placement="right">
          <FiPackage
            className={
              actualSection === enumSections._MATERIALS_ ? "text-accent" : ""
            }
          />
        </Tooltip>
      </Link>

      <Link href="/distributor">
        <Tooltip content="Proveedores" placement="right">
          <FaHandHoldingDroplet
            className={
              actualSection === enumSections._PROVIDERS_ ? "text-accent" : ""
            }
          />
        </Tooltip>
      </Link>

      <Link href="/transportist">
        <Tooltip content="Transportistas" placement="right">
          <FaTruckFast
            className={
              actualSection === enumSections._TRANSPORTIST_ ? "text-accent" : ""
            }
          />
        </Tooltip>
      </Link>

      <Link href="/employees">
        <Tooltip content="Empleados" placement="right">
          <FaUserTie
            className={
              actualSection === enumSections._EMPLOYEES_ ? "text-accent" : ""
            }
          />
        </Tooltip>
      </Link>
    </aside>
  );
};
