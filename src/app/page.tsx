import { auth } from "@/auth";
import { RegTable } from "@/components/dashboard/regTable";
import { Login } from "@/components/login";
import { UserInfo } from "@/components/userInfo";
import { enumSections } from "@/config/sections";
import { SessionMod } from "@/interfaces/sessionMod";
import { ActiveSectionProvider } from "@/providers/activeSection";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <ActiveSectionProvider section={enumSections._HOME_}>
        <section className="flex h-full items-center justify-center">
          <Login />
        </section>
      </ActiveSectionProvider>
    );
  }
  const registers = (session as SessionMod).user?.register || [];

  return (
    <ActiveSectionProvider section={enumSections._HOME_}>
      <section className="relative flex h-full flex-col gap-10 px-10 pb-16">
        <UserInfo session={session as SessionMod} />
        <RegTable registers={registers} />
      </section>
    </ActiveSectionProvider>
  );
}
