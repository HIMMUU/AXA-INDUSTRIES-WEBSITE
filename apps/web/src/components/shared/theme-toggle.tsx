'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 animate-pulse" />;
  }

  const cycleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={cycleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-white/10 transition active:scale-95"
      title={`Current Theme: ${theme}`}
    >
      {theme === 'dark' ? (
        <Moon className="h-4 w-4 text-blue-400" />
      ) : (
        <Sun className="h-4 w-4 text-amber-500" />
      )}
    </button>
  );
}
