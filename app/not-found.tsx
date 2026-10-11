
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-emerald-50 px-4 text-center">
      <p className="text-7xl font-extrabold text-emerald-700">404</p>

      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h1>

      <p className="mt-3 max-w-md text-gray-600">
        দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}