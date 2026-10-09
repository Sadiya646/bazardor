
"use client";

export default function Hero() {
  const scrollToProducts = () => {
    const section = document.getElementById("shob-ponno");

    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="mx-auto my-6 max-w-6xl overflow-hidden rounded-2xl border border-green-50 bg-white px-5 py-7 sm:px-9 sm:py-9">
      <div className="grid items-center gap-6 md:grid-cols-[1.35fr_.65fr]">
        {/* Hero Content */}
        <div>
          <span className="inline-flex rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-800">
            🌿 প্রতিদিনের বাজারদর, এক জায়গায়
          </span>

          <h1 className="mt-4 text-2xl font-bold leading-snug text-gray-900 sm:text-4xl">
            আজকের বাজারের দাম{" "}
            <span className="text-green-700">এক নজরে</span>
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
            চাল, ডাল, ফল, সবজি, মাছ ও মাংসের বাজারদর জানুন সহজেই।
            বাজারে যাওয়ার আগে জেনে নিন আজকের দাম।
          </p>

          <button
            type="button"
            onClick={scrollToProducts}
            className="mt-5 rounded-lg border border-green-700 px-5 py-3 text-sm font-semibold text-green-800 transition hover:bg-green-700 hover:text-white"
          >
            সব পণ্যের দাম দেখুন ↓
          </button>
        </div>

        {/* Basket Illustration */}
        <div className="flex items-center justify-center py-3">
          <div className="relative grid h-40 w-48 place-items-center rounded-[42%] bg-green-50 sm:h-48 sm:w-60">
            <span className="text-8xl sm:text-9xl">🧺</span>

            <span className="absolute -top-1 right-5 text-4xl">
              🥬
            </span>

            <span className="absolute bottom-2 left-3 text-3xl">
              🥕
            </span>

            <span className="absolute left-2 top-4 text-3xl">
              🍅
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
