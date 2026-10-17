'use client';

import { ReactNode } from 'react';
import { trackEvent } from '@/lib/landing-analytics';

type TrackedContactLinkProps = {
  href: string;
  kind: 'whatsapp' | 'call';
  placement: string;
  className: string;
  children: ReactNode;
};

export function TrackedContactLink({
  href,
  kind,
  placement,
  className,
  children
}: TrackedContactLinkProps) {
  return (
    <a
      href={href}
      className={className}
      target={kind === 'whatsapp' ? '_blank' : undefined}
      rel={kind === 'whatsapp' ? 'noopener noreferrer' : undefined}
      onClick={() =>
        trackEvent(kind === 'whatsapp' ? 'click_whatsapp' : 'click_call', {
          ...(kind === 'whatsapp' ? { link_url: href } : {}),
          placement
        })
      }
    >
      {children}
    </a>
  );
}
