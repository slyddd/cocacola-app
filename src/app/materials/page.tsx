import { MaterialsTable } from "@/components/materials/materialsTable";
import { ActiveSectionProvider } from "@/providers/activeSection";
import { enumSections } from "@/config/sections";
import materials from "@/data/materials.json";

export default function Materials() {
  return (
    <ActiveSectionProvider section={enumSections._MATERIALS_}>
      <MaterialsTable registers={materials} />
    </ActiveSectionProvider>
  );
}
