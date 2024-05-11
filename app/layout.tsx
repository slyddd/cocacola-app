import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import clsx from "clsx";
import { Aside } from "@/components/aside";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex h-screen flex-col bg-gradient-to-t from-primary to-background to-40%">
            <Navbar />
            <section className="flex h-full">
              <Aside />
              <main className="container mx-auto max-w-7xl flex-grow px-6 pt-16">
                {children}
              </main>
            </section>
          </div>
        </Providers>
      </body>
    </html>
  );
}
