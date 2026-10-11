
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="mx-auto min-h-screen max-w-6xl px-4 py-10">
        <section className="rounded-2xl bg-white p-8 shadow-sm sm:p-12">
          <p className="mb-3 text-sm font-bold text-emerald-700">
            বাংলাদেশের দৈনিক বাজার
          </p>

          <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
            আজকের বাজারের দাম
            <br />
            এক নজরে
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
            নিত্যপ্রয়োজনীয় পণ্যের দাম জানুন সহজেই।
            আপনার প্রতিদিনের বাজার হোক আরও পরিকল্পিত।
          </p>

          <a
            href="#সব-পণ্য"
            className="mt-6 inline-flex rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            সব পণ্য দেখুন →
          </a>
        </section>

        <ProductGrid />
      </main>
    </>
  );
}