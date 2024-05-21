import { EditDistributorForm } from "@/components/distributor/distributorForms";
import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";
import distributors from "@/data/distributors.json";

interface Params {
  params: {
    id: string;
  };
}

export default function EditMaterial({ params }: Params) {
  const distributor = distributors.find(
    (dsitributor) => dsitributor.id === parseInt(params.id),
  );
  return (
    <ActiveSectionProvider section={enumSections._PROVIDERS_} editMode>
      <EditDistributorForm distributor={distributor} />
    </ActiveSectionProvider>
  );
}
