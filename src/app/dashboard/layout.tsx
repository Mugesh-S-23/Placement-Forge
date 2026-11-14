'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafaf9] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col transition-colors duration-200 w-full">
      <Navbar onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)} />
      
      <div className="flex-1 flex w-full min-w-0">
        <Sidebar 
          isOpenMobile={isMobileSidebarOpen} 
          onCloseMobile={() => setIsMobileSidebarOpen(false)} 
        />
        
        <main className="flex-1 min-w-0 flex flex-col">
          <div className="p-4 sm:p-6 lg:p-8 flex-1 w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
