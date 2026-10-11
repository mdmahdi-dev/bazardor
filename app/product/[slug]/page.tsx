import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

type Product = {
    id: number;
    slug: string;
    categoryNameBn: string;
    categoryIcon: string;
    nameBn: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    unit: string;
    change: {
        dir: "up" | "down" | "same";
        pct: number;
    };
};

async function getProduct(slug: string): Promise<Product | null> {
    const response = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products",
        { next: { revalidate: 60 } },
    );

    if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
            `Failed to load products: ${response.status} ${errorText}`
        );
    }

    const result = await response.json();
    const products = Array.isArray(result) ? result : result.products ?? result.data ?? [];

    return products.find((product: Product) => product.slug === slug) ?? null;
}

export default async function ProductDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        return (
            <main className="min-h-screen bg-emerald-50 px-4 py-16">
                <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm">
                    <h1 className="text-2xl font-bold">পণ্য পাওয়া যায়নি</h1>
                    <p className="mt-2 text-gray-600">
                        পণ্যটি খুঁজে পাওয়া যায়নি।
                    </p>
                    <Link href="/" className="mt-6 inline-block font-semibold text-emerald-700">
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </main>
        );
    }

    const unit = product.unit === "kg" ? "কেজি" : product.unit;

    return (
        <main className="min-h-screen bg-emerald-50 px-4 py-10 sm:py-16">
            <div className="mx-auto max-w-3xl">
                <Link href="/" className="font-semibold text-emerald-800">
                    ← হোম পেজে ফিরে যান
                </Link>

                <article className="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-10">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 text-5xl">
                        {product.image || product.categoryIcon}
                    </div>

                    <p className="mt-6 text-sm font-semibold text-emerald-700">
                        {product.categoryNameBn}
                    </p>

                    <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
                        {product.nameBn}
                    </h1>

                    <p className="mt-5 text-sm text-gray-500">আজকের বাজারদর</p>
                    <p className="mt-1 text-4xl font-extrabold text-emerald-800">
                        {product.today.toLocaleString("bn-BD")} টাকা
                        <span className="ml-2 text-base font-medium text-gray-500">
                            / {unit}
                        </span>
                    </p>

                    <p className={`mt-4 inline-block rounded-full px-3 py-1 text-sm font-bold ${product.change.dir === "up"
                        ? "bg-red-50 text-red-600"
                        : product.change.dir === "down"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                        {product.change.dir === "up" ? "▲ দাম বেড়েছে" : product.change.dir === "down" ? "▼ দাম কমেছে" : "— দাম অপরিবর্তিত"}
                        {" "}{product.change.pct}%
                    </p>

                    <hr className="my-8 border-gray-100" />

                    <h2 className="text-lg font-bold">দামের তুলনা</h2>
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {[
                            { label: "গতকাল", price: product.yesterday },
                            { label: "গত সপ্তাহ", price: product.lastWeek },
                            { label: "গত মাস", price: product.lastMonth },
                        ].map((item) => (
                            <div key={item.label} className="rounded-xl bg-gray-50 p-4">
                                <p className="text-sm text-gray-500">{item.label}</p>
                                <p className="mt-1 text-lg font-bold">
                                    {item.price.toLocaleString("bn-BD")} টাকা
                                </p>
                            </div>
                        ))}
                    </div>
                </article>
            </div>
        </main>
    );
}