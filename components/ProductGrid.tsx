
"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";

type Product = {
    id: number;
    slug: string;
    category: string;
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

function numberValue(value: unknown): number {
    if (typeof value === "number") return value;
    if (typeof value !== "string") return 0;

    const digits = value
        .replace(/[০-৯]/g, (d) => String("০১২৩৪৫৬৭৮৯".indexOf(d)))
        .replace(/,/g, "")
        .replace(/[^\d.-]/g, "");

    return Number(digits) || 0;
}

function bengali(value: number) {
    return value.toLocaleString("bn-BD");
}

function priceOf(product: Product) {
    return product.today;
}

const emojis: Record<string, string> = {
    chal: "🍚",
    rice: "🍚",
    vegetable: "🥬",
    sobji: "🥬",
    dal: "🫘",
    oil: "🫙",
    fish: "🐟",
    meat: "🍗",
    egg: "🥚",
    alu: "🥔",
    peyaj: "🧅",
};

function emojiOf(product: Product) {
    return product.image || product.categoryIcon || "🛒";
}

export default function ProductGrid() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("সব");
    const [sortOrder, setSortOrder] = useState("default");

    useEffect(() => {
        getProducts()
            .then((result: unknown) => {
                const data = Array.isArray(result)
                    ? result
                    : typeof result === "object" && result !== null
                        ? ((result as { products?: unknown; data?: unknown }).products ??
                            (result as { data?: unknown }).data)
                        : [];

                if (!Array.isArray(data)) {
                    throw new Error("Unexpected API response");
                }

                setProducts(data as Product[]);
            })
            .catch(() => setError("পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।"))
            .finally(() => setLoading(false));
    }, []);


    const categories = [
        "সব",
        ...Array.from(
            new Set(
                products
                    .map((product) => product.category)
                    .filter((category): category is string => Boolean(category)),
            ),
        ),
    ];

    const risingProducts = products.filter(
        (product) => product.change.dir === "up",
    );

    const fallingProducts = products.filter(
        (product) => product.change.dir === "down",
    );

    const filteredProducts = products
        .filter(
            (product) =>
                selectedCategory === "সব" ||
                product.category === selectedCategory,
        )
        .sort((a, b) => {
            if (sortOrder === "low-high") return priceOf(a) - priceOf(b);
            if (sortOrder === "high-low") return priceOf(b) - priceOf(a);
            return 0;
        });

    return (
        <section id="সব-পণ্য" className="py-10">
            <div className="mb-6">
                <p className="text-sm font-semibold text-emerald-700">
                    প্রতিদিনের বাজার
                </p>
                <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">
                    সব পণ্য
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম এক নজরে দেখুন।
                </p>
            </div>

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <select
                    value={selectedCategory}
                    onChange={(event) => setSelectedCategory(event.target.value)}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm"
                    aria-label="পণ্যের ক্যাটাগরি"
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <select
                    value={sortOrder}
                    onChange={(event) => setSortOrder(event.target.value)}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm"
                    aria-label="দাম অনুযায়ী সাজান"
                >
                    <option value="default">ডিফল্ট সাজানো</option>
                    <option value="low-high">দাম: কম থেকে বেশি</option>
                    <option value="high-low">দাম: বেশি থেকে কম</option>
                </select>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-48 animate-pulse rounded-2xl bg-white p-5 shadow-sm"
                        >
                            <div className="mb-5 h-12 w-12 rounded-xl bg-gray-200" />
                            <div className="mb-3 h-4 w-2/3 rounded bg-gray-200" />
                            <div className="h-4 w-1/2 rounded bg-gray-200" />
                        </div>
                    ))}
                </div>
            ) : error ? (
                <p role="alert" className="rounded-xl bg-white p-6 text-red-600">
                    {error}
                </p>
            ) : products.length === 0 ? (
                <p className="rounded-xl bg-white p-6 text-gray-600">
                    কোনো পণ্য পাওয়া যায়নি।
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((product, index) => {
                        const name = product.nameBn;
                        const id = product.slug || product.id;
                        const price = product.today;
                        const change = product.change.pct;

                        return (
                            <a
                                key={String(id)}
                                href={`/product/${id}`}
                                className="group rounded-2xl border border-emerald-50 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-3xl">
                                    {emojiOf(product)}
                                </div>

                                <h3 className="font-bold text-gray-900 group-hover:text-emerald-800">
                                    {name}
                                </h3>

                                <p className="mt-1 text-xs text-gray-500">
                                    প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
                                </p>

                                <div className="mt-5 flex flex-wrap items-end justify-between gap-2">
                                    <div>
                                        <p className="text-xs text-gray-500">আজকের দাম</p>
                                        <p className="mt-1 text-xl font-extrabold text-emerald-800">
                                            {bengali(price)} টাকা
                                        </p>
                                    </div>

                                    <span
                                        className={`rounded-full px-2 py-1 text-xs font-bold ${product.change.dir === "up"
                                            ? "bg-red-50 text-red-600"
                                            : product.change.dir === "down"
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "bg-gray-100 text-gray-500"
                                            }`}
                                    >
                                        {product.change.dir === "up"
                                            ? "▲"
                                            : product.change.dir === "down"
                                                ? "▼"
                                                : "—"}{" "}
                                        {bengali(product.change.pct)}%
                                    </span>
                                </div>
                            </a>
                        );
                    })}
                </div>
            )}

            {!loading && !error && (
                <>
                    <div className="mt-12 mb-6">
                        <h2 className="text-2xl font-extrabold text-red-600">
                            ▲ যেসব পণ্যের দাম বেড়েছে
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            আজকের বাজারে দাম বৃদ্ধি পাওয়া পণ্য
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {risingProducts.map((product) => (
                            <div
                                key={product.id}
                                className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm"
                            >
                                <div className="text-3xl">{product.image}</div>
                                <h3 className="mt-3 font-bold">{product.nameBn}</h3>
                                <p className="mt-2 text-xl font-extrabold">
                                    {bengali(product.today)} টাকা
                                </p>
                                <span className="mt-2 inline-block rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-red-600">
                                    ▲ {bengali(product.change.pct)}%
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 mb-6">
                        <h2 className="text-2xl font-extrabold text-emerald-700">
                            ▼ যেসব পণ্যের দাম কমেছে
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            আজকের বাজারে দাম হ্রাস পাওয়া পণ্য
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {fallingProducts.map((product) => (
                            <div
                                key={product.id}
                                className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm"
                            >
                                <div className="text-3xl">{product.image}</div>
                                <h3 className="mt-3 font-bold">{product.nameBn}</h3>
                                <p className="mt-2 text-xl font-extrabold">
                                    {bengali(product.today)} টাকা
                                </p>
                                <span className="mt-2 inline-block rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                                    ▼ {bengali(product.change.pct)}%
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}