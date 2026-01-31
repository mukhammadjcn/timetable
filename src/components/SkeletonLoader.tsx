export const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-40 bg-slate-100 rounded-2xl"></div>
    ))}
  </div>
);
