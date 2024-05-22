import { EditTransportistForm } from "@/components/transportist/transportistForms";
import { enumSections } from "@/config/sections";
import transportist from "@/data/transportist.json";
import { ActiveSectionProvider } from "@/providers/activeSection";

interface Params {
  params: {
    id: string;
  };
}

export default function EditTransportist({ params }: Params) {
  const transportists = transportist.find(
    (transportistItem) => transportistItem.id === parseInt(params.id),
  );
  return (
    <ActiveSectionProvider section={enumSections._TRANSPORTIST_} editMode>
      <EditTransportistForm transportist={transportists} />
    </ActiveSectionProvider>
  );
}
