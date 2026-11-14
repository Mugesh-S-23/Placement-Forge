import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { ForgeBotDrawer } from "@/components/ForgeBotDrawer";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('placementforge_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var mode = saved || 'light';
                  var isDark = mode === 'dark' || (mode === 'system' && prefersDark);
                  var root = document.documentElement;
                  if (isDark) {
                    root.classList.add('dark');
                    root.classList.remove('light');
                  } else {
                    root.classList.add('light');
                    root.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[var(--background)] text-[var(--foreground)] antialiased min-h-screen selection:bg-indigo-500/20 selection:text-indigo-600 dark:selection:text-indigo-200 transition-colors duration-150">
        <AppProvider>
          {children}
          <ForgeBotDrawer />
        </AppProvider>
      </body>
    </html>
  );
}
