
export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-8 h-9 w-72 rounded-lg bg-gray-200" />

        <div className="mb-6 h-10 w-56 rounded-lg bg-gray-200" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border bg-white p-5"
            >
              <div className="mb-4 h-24 rounded-lg bg-gray-200" />
              <div className="mb-3 h-5 w-3/4 rounded bg-gray-200" />
              <div className="mb-4 h-4 w-1/2 rounded bg-gray-200" />
              <div className="h-8 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
