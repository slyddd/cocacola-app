import { AddMaterialForm } from "@/components/materials/materialsForms";
import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";

export default function AddMaterial() {
  return (
    <ActiveSectionProvider section={enumSections._MATERIALS_} editMode>
      <AddMaterialForm />
    </ActiveSectionProvider>
  );
}
