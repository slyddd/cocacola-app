import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";

export default function Home() {
  return (
    <ActiveSectionProvider section={enumSections._HOME_}>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"></section>
    </ActiveSectionProvider>
  );
}
