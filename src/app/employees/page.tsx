import { title } from "@/components/primitives";
import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";

export default function Employees() {
  return (
    <ActiveSectionProvider section={enumSections._EMPLOYEES_}>
      <div>
        <h1 className={title()}>EMpleados</h1>
      </div>
    </ActiveSectionProvider>
  );
}
