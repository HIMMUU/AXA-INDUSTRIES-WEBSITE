'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { NotificationItem } from '@axa/types';
import { Bell, ShoppingBag, ShieldAlert, CheckCircle } from 'lucide-react';
import { formatDate } from '@axa/utils';

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: notifications = [] } = useQuery<NotificationItem[]>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const res = await apiClient('/v1/dashboard/notifications');
      return res.data || [];
    },
    refetchInterval: 30000 // Poll every 30s
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-300 transition hover:bg-white/10 hover:text-white"
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-lg">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-11 z-50 w-80 rounded-2xl border border-white/10 bg-[#121216] p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-xs font-semibold text-white">Notifications</h3>
              <span className="text-[10px] text-neutral-400">{unreadCount} unread</span>
            </div>

            <div className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
              {notifications.length === 0 ? (
                <div className="py-6 text-center text-xs text-neutral-500">
                  No new notifications
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="flex gap-3 rounded-xl p-2.5 transition hover:bg-white/5"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                      {n.type === 'ORDER' ? (
                        <ShoppingBag className="h-3.5 w-3.5" />
                      ) : n.type === 'SYSTEM' ? (
                        <CheckCircle className="h-3.5 w-3.5" />
                      ) : (
                        <ShieldAlert className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <div className="flex-1 truncate">
                      <p className="text-xs font-medium text-white truncate">{n.title}</p>
                      <p className="text-[11px] text-neutral-400 truncate">{n.message}</p>
                      <span className="text-[9px] text-neutral-500">{formatDate(n.createdAt)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
