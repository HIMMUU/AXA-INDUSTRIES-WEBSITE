'use client';

import { useDashboardStore } from '@/store/use-dashboard-store';
import { Sidebar } from './components/sidebar';
import { Navbar } from './components/navbar';
import { GlobalSearchModal } from './components/global-search-modal';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarCollapsed } = useDashboardStore();

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-foreground antialiased">
      {/* Collapsible Sidebar */}
      <Sidebar />

      {/* Global Search Modal */}
      <GlobalSearchModal />

      {/* Main Content Wrapper */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Sticky Top Navbar */}
        <Navbar />

        {/* Content Area */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
