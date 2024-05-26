import { auth } from "@/auth";
import { AddDistributorForm } from "@/components/distributor/distributorForms";
import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";

export default async function AddMaterial() {
  const session = await auth();
  return (
    <ActiveSectionProvider section={enumSections._PROVIDERS_} editMode>
      <AddDistributorForm admin={session?.user?.id || ""} />
    </ActiveSectionProvider>
  );
}
