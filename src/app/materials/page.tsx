import { MaterialsTable } from "@/components/materials/materialsTable";
import materials from "@/data/materials.json";

export default function Materials() {
  return <MaterialsTable registers={materials} />;
}
