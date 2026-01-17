import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FC, PropsWithChildren } from "react";

import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { MonthProvider } from "@/lib/MonthContext";

import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GreenBiz - Garlic Wholesale Manager",
  description: "Admin panel for managing garlic wholesale business",
  generator: "v0.app",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body className={`font-sans antialiased`}>
      <ErrorBoundary>
        <MonthProvider>
          {children}
          <Analytics />
          <Toaster />
        </MonthProvider>
      </ErrorBoundary>
    </body>
  </html>
);

export default RootLayout;
