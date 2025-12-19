import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Assistant, Bungee } from "next/font/google";

import "./globals.css";

const display = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const body = Assistant({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "ParkListMc",
  description: "Next.js + React + TypeScript starter for ParkListMc.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
