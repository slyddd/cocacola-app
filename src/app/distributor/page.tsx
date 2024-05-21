import { ActiveSectionProvider } from "@/providers/activeSection";
import { enumSections } from "@/config/sections";
import distribuitors from "@/data/distributors.json";
import { DistributorsTable } from "@/components/distributor/distributorsTable";

export default function Materials() {
  return (
    <ActiveSectionProvider section={enumSections._PROVIDERS_}>
      <DistributorsTable registers={distribuitors} />
    </ActiveSectionProvider>
  );
}
