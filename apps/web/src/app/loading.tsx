export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent shadow-md" />
        <span className="text-xs font-bold text-slate-700 tracking-wider uppercase">Loading Page...</span>
      </div>
    </div>
  );
}
