import { EditDistributorForm } from "@/components/distributor/distributorForms";
import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";
import axios from "axios";
import { DistributorInterface } from "@/interfaces/distributorInterface";
import { auth } from "@/auth";

interface Params {
  params: {
    id: string;
  };
}

export default async function EditMaterial({ params }: Params) {
  const session = await auth();
  const { data } = await axios.get<DistributorInterface>(
    process.env.API_URL + "/distributor/" + params.id,
  );

  return (
    <ActiveSectionProvider section={enumSections._PROVIDERS_} editMode>
      <EditDistributorForm distributor={data} admin={session?.user?.id || ""} />
    </ActiveSectionProvider>
  );
}
