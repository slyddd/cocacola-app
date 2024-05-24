import { MaterialsTable } from "@/components/materials/materialsTable";
import { ActiveSectionProvider } from "@/providers/activeSection";
import { enumSections } from "@/config/sections";
import axios from "axios";
import { MainInterface } from "@/interfaces/mainInterface";
import { MaterialsInterface } from "@/interfaces/materialsInterface";

export default async function Materials() {
  const { data } = await axios.get<MainInterface<MaterialsInterface>>(
    process.env.API_URL + "/materials",
  );

  return (
    <ActiveSectionProvider section={enumSections._MATERIALS_}>
      <MaterialsTable registers={data.results} />
    </ActiveSectionProvider>
  );
}
