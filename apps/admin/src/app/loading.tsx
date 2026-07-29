import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0C] text-white">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
        <p className="text-xs text-neutral-500 font-mono">Loading...</p>
      </div>
    </div>
  );
}
