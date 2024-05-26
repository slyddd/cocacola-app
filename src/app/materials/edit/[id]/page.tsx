import { auth } from "@/auth";
import { EditMaterialForm } from "@/components/materials/materialsForms";
import { enumSections } from "@/config/sections";
import { MaterialsInterface } from "@/interfaces/materialsInterface";
import { ActiveSectionProvider } from "@/providers/activeSection";
import axios from "axios";

interface Params {
  params: {
    id: string;
  };
}

export default async function EditMaterial({ params }: Params) {
  const session = await auth();
  const { data } = await axios.get<MaterialsInterface>(
    process.env.API_URL + "/materials/" + params.id,
  );

  return (
    <ActiveSectionProvider section={enumSections._MATERIALS_} editMode>
      <EditMaterialForm material={data} admin={session?.user?.id || ""} />
    </ActiveSectionProvider>
  );
}
