import { title } from "@/components/primitives";
import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";

export default function Materials() {
  return (
    <ActiveSectionProvider section={enumSections._MATERIALS_}>
      <div>
        <h1 className={title()}>Materia Prima</h1>
      </div>
    </ActiveSectionProvider>
  );
}
