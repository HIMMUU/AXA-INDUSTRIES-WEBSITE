export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-stone-50 pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-pulse">
      <div className="h-8 w-64 bg-stone-200 rounded-xl" />
      <div className="h-12 w-full bg-stone-200 rounded-2xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="h-80 bg-white border border-stone-200 rounded-3xl p-5 space-y-4 shadow-sm">
            <div className="aspect-square w-full bg-stone-100 rounded-2xl" />
            <div className="h-4 w-3/4 bg-stone-200 rounded" />
            <div className="h-3 w-1/2 bg-stone-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
