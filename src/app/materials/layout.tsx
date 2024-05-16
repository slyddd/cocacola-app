import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";

interface MaterialLayoutProps {
  children: React.ReactNode;
}

export default function MaterialsLayout({ children }: MaterialLayoutProps) {
  return (
    <ActiveSectionProvider section={enumSections._MATERIALS_}>
      {children}
    </ActiveSectionProvider>
  );
}
