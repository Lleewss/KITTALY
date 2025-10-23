export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="border-b border-neutral-200 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 md:px-6">
          <div className="h-10 w-48 animate-pulse bg-neutral-200" />
          <div className="mt-3 h-6 w-96 animate-pulse bg-neutral-200" />
        </div>
      </section>

      <div className="mx-auto max-w-screen-xl px-4 py-12 md:px-6 md:py-16">
        {/* Featured Article Skeleton */}
        <section className="mb-16 border-b border-neutral-200 pb-16">
          <div className="mb-4 h-4 w-32 animate-pulse bg-neutral-200" />
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="aspect-[16/9] animate-pulse bg-neutral-200" />
            <div className="flex flex-col justify-center">
              <div className="mb-3 h-4 w-48 animate-pulse bg-neutral-200" />
              <div className="mb-4 h-12 w-full animate-pulse bg-neutral-200" />
              <div className="mb-2 h-4 w-full animate-pulse bg-neutral-200" />
              <div className="mb-4 h-4 w-3/4 animate-pulse bg-neutral-200" />
              <div className="h-4 w-32 animate-pulse bg-neutral-200" />
            </div>
          </div>
        </section>

        {/* Quick Links Skeleton */}
        <section className="mb-16">
          <div className="mb-6 h-8 w-48 animate-pulse bg-neutral-200" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-neutral-200 p-6">
                <div className="mb-2 h-6 w-32 animate-pulse bg-neutral-200" />
                <div className="mb-4 h-4 w-full animate-pulse bg-neutral-200" />
                <div className="h-3 w-24 animate-pulse bg-neutral-200" />
              </div>
            ))}
          </div>
        </section>

        {/* Articles Grid Skeleton */}
        <section>
          <div className="mb-8 h-8 w-32 animate-pulse bg-neutral-200" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i}>
                <div className="mb-4 aspect-[16/9] animate-pulse bg-neutral-200" />
                <div className="mb-2 h-3 w-32 animate-pulse bg-neutral-200" />
                <div className="mb-2 h-6 w-full animate-pulse bg-neutral-200" />
                <div className="h-4 w-3/4 animate-pulse bg-neutral-200" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
