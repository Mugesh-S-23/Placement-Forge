import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { ForgeBotDrawer } from "@/components/ForgeBotDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlacementForge - The Zero-to-Offer Placement Operating System",
  description: "Ultra-clean, non-intimidating placement operating system for engineering campus drives (TCS, Zoho, CTS, Infosys, SDE). Turn zero foundations into campus offers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 text-slate-100 antialiased min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200`}>
        <AppProvider>
          {children}
          <ForgeBotDrawer />
        </AppProvider>
      </body>
    </html>
  );
}
