'use client';

import { usePathname } from 'next/navigation';
import { useDashboardStore } from '@/store/use-dashboard-store';
import { useAuthStore } from '@/store/use-auth-store';
import { NotificationDropdown } from './notification-dropdown';
import { Search, Menu, User, ShieldCheck } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { admin } = useAuthStore();
  const { toggleMobileSidebar, setSearchOpen } = useDashboardStore();

  const getPageTitle = () => {
    if (pathname.includes('/products')) return 'Products Management';
    if (pathname.includes('/orders')) return 'Order Management';
    if (pathname.includes('/customers')) return 'Customer Records';
    if (pathname.includes('/settings')) return 'Platform Settings';
    return 'Dashboard Overview';
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0A0A0C]/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Title & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMobileSidebar}
            className="flex lg:hidden h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-300"
            aria-label="Open Navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-sm font-semibold text-white">{getPageTitle()}</h1>
          </div>
        </div>

        {/* Right Search, Notification & Profile */}
        <div className="flex items-center gap-3">
          {/* Global Search Trigger Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-400 transition hover:border-white/20 hover:text-white"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search...</span>
            <kbd className="ml-2 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-neutral-400">
              ⌘K
            </kbd>
          </button>

          {/* Mobile Search Icon */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex sm:hidden h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-300"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Notifications Dropdown */}
          <NotificationDropdown />

          {/* Admin Avatar Badge */}
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5 pl-2.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="hidden md:inline text-xs font-medium text-white truncate max-w-[120px]">
              {admin?.name || 'Admin'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
