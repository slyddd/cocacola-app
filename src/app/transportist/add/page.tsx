import { AddTransportistForm } from "@/components/transportist/transportistForms";
import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";

export default function AddMaterial() {
  return (
    <ActiveSectionProvider section={enumSections._TRANSPORTIST_} editMode>
      <AddTransportistForm />
    </ActiveSectionProvider>
  );
}
