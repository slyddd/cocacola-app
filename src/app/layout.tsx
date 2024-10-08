import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { fontSans } from "@/config/fonts";
import { Providers } from "../providers/ui";
import { Navbar } from "@/components/navbar";
import clsx from "clsx";
import { Aside } from "@/components/aside";
import { BlurActions } from "@/components/blurActions";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: {
    default: "Coca-Cola App",
    template: `%s - Coca-Cola App`,
  },
  description: "Coca-Cola App to manage inventory",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await auth();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="*:scrollbar *:scrollbar-hide"
    >
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex h-screen flex-col overflow-clip bg-gradient-to-t from-primary to-background to-40%">
            <BlurActions />
            <Navbar user={session?.user?.name ?? "user"} />
            <section className="flex h-[90vh] overflow-hidden">
              {session && <Aside />}
              <main className="w-full px-6 pt-10">{children}</main>
            </section>
          </div>
        </Providers>
      </body>
    </html>
  );
}
