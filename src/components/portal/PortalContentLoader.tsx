import { Skeleton } from "@/components/ui/skeleton";

export default function PortalContentLoader() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page title skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 bg-slate-200" />
        <Skeleton className="h-4 w-72 bg-slate-200" />
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 p-6 space-y-3"
          >
            <Skeleton className="h-4 w-24 bg-slate-200" />
            <Skeleton className="h-8 w-32 bg-slate-200" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <Skeleton className="h-6 w-40 bg-slate-200" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full bg-slate-200" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full max-w-md bg-slate-200" />
                <Skeleton className="h-3 w-full max-w-sm bg-slate-200" />
              </div>
              <Skeleton className="h-6 w-20 bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
