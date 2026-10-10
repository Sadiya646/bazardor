
import { fetchProducts, fetchCategories } from "@/lib/api";
import CategoryProducts from "@/app/category/[slug]/CategoryProduct";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const categories = await fetchCategories();
  const currentCategory = categories.find(
    (category) => category.slug === slug
  );

  if (!currentCategory) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-xl rounded-2xl border bg-white p-8 text-center">
          <p className="mb-3 text-5xl">🔍</p>
          <h1 className="text-2xl font-bold text-gray-800">
            ক্যাটাগরি পাওয়া যায়নি
          </h1>
          <p className="mt-2 text-gray-500">
            এই ক্যাটাগরিটি নেই অথবা লিংকটি সঠিক নয়।
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const products = await fetchProducts(slug);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-emerald-600">
              হোম
            </Link>
            <span>/</span>
            <span>{currentCategory.name}</span>
          </div>

          <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
            <span>{currentCategory.icon || "📦"}</span>
            <span>{currentCategory.name} ক্যাটাগরির বাজার দর</span>
          </h1>
        </div>

        <CategoryProducts products={products} />
      </div>
    </main>
  );
}
