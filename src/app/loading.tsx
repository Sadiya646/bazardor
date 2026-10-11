
export default function Loading() {
  return (
    <main
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
      aria-label="পণ্য লোড হচ্ছে"
    >
      {/* Hero skeleton */}
      <section className="mb-10 animate-pulse rounded-3xl bg-emerald-50 p-6 sm:p-10">
        <div className="max-w-xl space-y-4">
          <div className="h-4 w-32 rounded bg-emerald-200" />
          <div className="h-8 w-3/4 rounded bg-emerald-200 sm:h-10" />
          <div className="h-4 w-full rounded bg-emerald-100" />
          <div className="h-4 w-2/3 rounded bg-emerald-100" />
          <div className="h-11 w-36 rounded-xl bg-emerald-200" />
        </div>
      </section>

      {/* Price increase section */}
      <section className="mb-10">
        <div className="mb-5 animate-pulse space-y-2">
          <div className="h-7 w-52 rounded bg-gray-200" />
          <div className="h-4 w-64 max-w-full rounded bg-gray-100" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`up-${index}`}
              className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="h-14 w-14 rounded-xl bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-100" />
                </div>
              </div>
              <div className="mb-3 h-3 w-20 rounded bg-gray-100" />
              <div className="h-6 w-32 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </section>

      {/* All products section */}
      <section>
        <div className="mb-5 animate-pulse space-y-2">
          <div className="h-7 w-40 rounded bg-gray-200" />
          <div className="h-4 w-64 max-w-full rounded bg-gray-100" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={`product-${index}`}
              className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="h-14 w-14 rounded-xl bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-100" />
                </div>
              </div>

              <div className="mb-3 h-3 w-20 rounded bg-gray-100" />

              <div className="flex items-center justify-between">
                <div className="h-6 w-28 rounded bg-gray-200" />
                <div className="h-6 w-16 rounded-full bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
