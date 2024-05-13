import { title } from "@/components/primitives";
import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";

export default function Transportist() {
  return (
    <ActiveSectionProvider section={enumSections._TRANSPORTIST_}>
      <div>
        <h1 className={title()}>Transportista</h1>
      </div>
    </ActiveSectionProvider>
  );
}
