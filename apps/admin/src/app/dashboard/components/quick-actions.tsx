'use client';

import Link from 'next/link';
import { PackagePlus, ShoppingBag, Users, Layers, ArrowUpRight } from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      title: 'Add New Product',
      description: 'Upload images, specs & pricing',
      icon: PackagePlus,
      href: '/dashboard/products/new',
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    },
    {
      title: 'Create Order / Enquiry',
      description: 'Log new customer order request',
      icon: ShoppingBag,
      href: '/dashboard/orders/new',
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    },
    {
      title: 'Manage Customers',
      description: 'View customer directory & notes',
      icon: Users,
      href: '/dashboard/customers',
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    },
    {
      title: 'Catalog Overview',
      description: 'Filter active & archived items',
      icon: Layers,
      href: '/dashboard/products',
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    }
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <Link
              key={idx}
              href={act.href}
              className="group relative flex items-center justify-between rounded-2xl border border-white/10 bg-[#121216]/60 p-4 transition-all duration-300 hover:border-white/20 hover:bg-[#121216] shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${act.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white group-hover:text-blue-400 transition">
                    {act.title}
                  </h4>
                  <p className="text-[10px] text-neutral-400">{act.description}</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-neutral-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
