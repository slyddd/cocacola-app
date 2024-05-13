import { title } from "@/components/primitives";
import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";

export default function Providers() {
  return (
    <ActiveSectionProvider section={enumSections._PROVIDERS_}>
      <div>
        <h1 className={title()}>Proveedores</h1>:w
      </div>
    </ActiveSectionProvider>
  );
}
