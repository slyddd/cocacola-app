import { auth } from "@/auth";
import { AddMaterialForm } from "@/components/materials/materialsForms";
import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";

export default async function AddMaterial() {
  const session = await auth();
  return (
    <ActiveSectionProvider section={enumSections._MATERIALS_} editMode>
      <AddMaterialForm admin={session?.user?.id || ""} />
    </ActiveSectionProvider>
  );
}
