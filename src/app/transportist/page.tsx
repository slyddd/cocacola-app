import { TransportistTable } from "@/components/transportist/transportistTable";
import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";
import transportist from "@/data/transportist.json";

export default function Transportist() {
  return (
    <ActiveSectionProvider section={enumSections._TRANSPORTIST_}>
      <TransportistTable registers={transportist} />
    </ActiveSectionProvider>
  );
}
