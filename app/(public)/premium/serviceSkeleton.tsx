const ServicesSkeleton = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-xl border bg-card"
        >
          {/* Image skeleton */}
          <div className="h-48 w-full animate-pulse bg-muted" />

          <div className="space-y-4 p-5">
            {/* Category */}
            <div className="h-5 w-24 animate-pulse rounded bg-muted" />

            {/* Title */}
            <div className="space-y-2">
              <div className="h-5 w-full animate-pulse rounded bg-muted" />
              <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between border-t pt-4">
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              <div className="h-4 w-16 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesSkeleton;