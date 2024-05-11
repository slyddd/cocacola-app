import { FiPackage } from "react-icons/fi";
import { FaHandHoldingDroplet, FaTruckFast } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import Link from "next/link";
import { Tooltip } from "@nextui-org/tooltip";

export const Aside = () => {
  return (
    <aside className="flex h-full w-[6%] flex-col items-center justify-between py-20 text-3xl">
      <Link href="/materials" className="hover:opacity-70">
        <Tooltip content="Materia Prima" placement="right">
          <FiPackage />
        </Tooltip>
      </Link>

      <Link href="/providers" className="hover:opacity-70">
        <Tooltip content="Proveedores" placement="right">
          <FaHandHoldingDroplet />
        </Tooltip>
      </Link>

      <Link href="/transportist" className="hover:opacity-70">
        <Tooltip content="Transportistas" placement="right">
          <FaTruckFast />
        </Tooltip>
      </Link>

      <Link href="/employees" className="hover:opacity-70">
        <Tooltip content="Empleados" placement="right">
          <FaUserTie />
        </Tooltip>
      </Link>
    </aside>
  );
};
