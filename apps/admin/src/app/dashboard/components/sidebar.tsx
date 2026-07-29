'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDashboardStore } from '@/store/use-dashboard-store';
import { useAuthStore } from '@/store/use-auth-store';
import { apiClient } from '@/lib/api-client';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { useState } from 'react';

const NAV_ITEMS = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Products', href: '/dashboard/products', icon: Package },
  { title: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
  { title: 'Customers', href: '/dashboard/customers', icon: Users },
  { title: 'Settings', href: '/dashboard/settings', icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();
  const {
    isSidebarCollapsed,
    toggleSidebar,
    isMobileSidebarOpen,
    setMobileSidebarOpen
  } = useDashboardStore();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await apiClient('/v1/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error(err);
    } finally {
      logout();
      router.push('/login');
    }
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between p-4">
      {/* Top Header & Collapse Toggle */}
      <div>
        <div className="flex items-center justify-between pb-6 pt-2">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-black font-bold text-xs shadow-md">
              AXA
            </div>
            {!isSidebarCollapsed && (
              <div className="truncate">
                <p className="text-sm font-semibold tracking-wide text-white">AXA Store</p>
                <p className="text-[10px] text-neutral-400">Enterprise Portal</p>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-neutral-400 hover:text-white transition"
            aria-label="Toggle Sidebar"
          >
            {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="flex lg:hidden h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-neutral-400"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5 mt-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium transition ${
                  isActive
                    ? 'bg-white text-neutral-950 font-semibold shadow-lg shadow-white/5'
                    : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-neutral-950' : 'text-neutral-400 group-hover:text-white'}`} />
                {!isSidebarCollapsed && <span className="truncate">{item.title}</span>}

                {/* Tooltip on collapse */}
                {isSidebarCollapsed && (
                  <div className="absolute left-full ml-3 hidden rounded-lg bg-neutral-900 border border-white/10 px-2.5 py-1 text-xs text-white shadow-xl group-hover:block z-50 whitespace-nowrap">
                    {item.title}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Logout Button */}
      <div className="border-t border-white/10 pt-4">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-neutral-400 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-4 w-4 shrink-0 text-neutral-400 group-hover:text-red-400" />
          {!isSidebarCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside
        className={`hidden lg:flex fixed left-0 top-0 z-30 h-screen border-r border-white/10 bg-[#0C0C0F] transition-all duration-300 ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-[#0C0C0F] border-r border-white/10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
