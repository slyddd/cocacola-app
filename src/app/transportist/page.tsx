import { TransportistTable } from "@/components/transportist/transportistTable";
import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";
import axios from "axios";
import { MainInterface } from "@/interfaces/mainInterface";
import { TransportistInterface } from "@/interfaces/trasnportistInterface";

export default async function Transportist() {
  const { data } = await axios.get<MainInterface<TransportistInterface>>(
    process.env.API_URL + "/transportist",
  );
  return (
    <ActiveSectionProvider section={enumSections._TRANSPORTIST_}>
      <TransportistTable registers={data.results} />
    </ActiveSectionProvider>
  );
}
