import { RegTable } from "@/components/dashboard/regTable";
import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";
import { Chip } from "@nextui-org/chip";
import { FaUser } from "react-icons/fa6";
import regs from "@/data/regs.json";

export default function Home() {
  return (
    <ActiveSectionProvider section={enumSections._HOME_}>
      <section className="relative flex h-full flex-col gap-10 px-10 pb-16">
        <div className="flex w-full items-center">
          <h2 className="w-1/2 text-xl font-bold">Registo de Cambios</h2>
          <Chip
            classNames={{
              content: "flex",
            }}
            className="ml-auto h-fit max-w-full bg-transparent px-6 py-3"
            endContent={<FaUser className="ml-6 text-xl" />}
            color="default"
            variant="light"
          >
            <div className="flex flex-col text-right">
              <p className="font-bold">User</p>
              <p>1012320185</p>
            </div>
          </Chip>
        </div>
        <RegTable registers={regs} />
      </section>
    </ActiveSectionProvider>
  );
}
