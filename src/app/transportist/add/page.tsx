import { auth } from "@/auth";
import { AddTransportistForm } from "@/components/transportist/transportistForms";
import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";

export default async function AddMaterial() {
  const session = await auth();
  return (
    <ActiveSectionProvider section={enumSections._TRANSPORTIST_} editMode>
      <AddTransportistForm admin={session?.user?.id || ""} />
    </ActiveSectionProvider>
  );
}
