import { EditMaterialForm } from "@/components/materials/materialsForms";
import { enumSections } from "@/config/sections";
import materials from "@/data/materials.json";
import { ActiveSectionProvider } from "@/providers/activeSection";

interface Params {
  params: {
    id: string;
  };
}

export default function EditMaterial({ params }: Params) {
  const material = materials.find(
    (material) => material.id === parseInt(params.id),
  );
  return (
    <ActiveSectionProvider section={enumSections._MATERIALS_} editMode>
      <EditMaterialForm material={material} />
    </ActiveSectionProvider>
  );
}
