import { auth } from "@/auth";
import { EditTransportistForm } from "@/components/transportist/transportistForms";
import { enumSections } from "@/config/sections";
import { TransportistInterface } from "@/interfaces/trasnportistInterface";
import { ActiveSectionProvider } from "@/providers/activeSection";
import axios from "axios";

interface Params {
  params: {
    id: string;
  };
}

export default async function EditTransportist({ params }: Params) {
  const session = await auth();
  const { data } = await axios.get<TransportistInterface>(
    process.env.API_URL + "/transportist/" + params.id,
  );

  return (
    <ActiveSectionProvider section={enumSections._TRANSPORTIST_} editMode>
      <EditTransportistForm
        transportist={data}
        admin={session?.user?.id || ""}
      />
    </ActiveSectionProvider>
  );
}
