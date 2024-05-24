import { ActiveSectionProvider } from "@/providers/activeSection";
import { enumSections } from "@/config/sections";
import { DistributorsTable } from "@/components/distributor/distributorsTable";
import axios from "axios";
import { MainInterface } from "@/interfaces/mainInterface";
import { DistributorInterface } from "@/interfaces/distributorInterface";

export default async function Materials() {
  const { data } = await axios.get<MainInterface<DistributorInterface>>(
    process.env.API_URL + "/distributor",
  );

  return (
    <ActiveSectionProvider section={enumSections._PROVIDERS_}>
      <DistributorsTable registers={data.results} />
    </ActiveSectionProvider>
  );
}
