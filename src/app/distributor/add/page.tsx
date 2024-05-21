import { AddDistributorForm } from "@/components/distributor/distributorForms";
import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";

export default function AddMaterial() {
  return (
    <ActiveSectionProvider section={enumSections._PROVIDERS_} editMode>
      <AddDistributorForm />
    </ActiveSectionProvider>
  );
}
