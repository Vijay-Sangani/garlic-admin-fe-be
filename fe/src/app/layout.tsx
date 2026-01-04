import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JSX } from "react";

import "../styles/globals.css";
import { Sidebar } from "../components";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Garlic Admin - Wholesale Management",
  description: "Admin panel for Garlic & Green Peas wholesale business",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

const ConditionalLayout = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <>
    <div className="in-[.login-page_&]:hidden">
      <Sidebar />
      <main className="lg:ml-64 min-h-screen">{children}</main>
    </div>
    <div className="hidden in-[.login-page_&]:block">{children}</div>
  </>
);

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element => (
  <html lang="en">
    <body className={`font-sans antialiased`}>
      <ConditionalLayout>{children}</ConditionalLayout>
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
