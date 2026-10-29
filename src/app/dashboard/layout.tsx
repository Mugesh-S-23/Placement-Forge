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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)} />
      
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar 
          isOpenMobile={isMobileSidebarOpen} 
          onCloseMobile={() => setIsMobileSidebarOpen(false)} 
        />
        
        <main className="flex-1 lg:pl-64 min-w-0 flex flex-col">
          <div className="p-4 sm:p-6 lg:p-8 flex-1">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
