
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const categories = [
  { name: "সব", href: "#সব-পণ্য" },
  { name: "চাল ও শস্য", href: "#চাল-ও-শস্য" },
  { name: "ডাল", href: "#ডাল" },
  { name: "তেল", href: "#তেল" },
  { name: "সবজি", href: "#সবজি" },
  { name: "মাছ ও মাংস", href: "#মাছ-ও-মাংস" },
];

const tickerItems = [
  { emoji: "🍚", name: "চাল", price: "৭০ টাকা/কেজি", change: "▲ ২.১%" },
  { emoji: "🧅", name: "পেঁয়াজ", price: "৬০ টাকা/কেজি", change: "▼ ২.৯%" },
  { emoji: "🥔", name: "আলু", price: "৩৫ টাকা/কেজি", change: "▲ ১.৫%" },
  { emoji: "🥚", name: "ডিম", price: "৫৫ টাকা/ডজন", change: "— ০.০%" },
];

export default function Navbar() {
  const [date, setDate] = useState("");
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const formattedDate = new Intl.DateTimeFormat("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

    setDate(formattedDate);
  }, []);

  async function handleLogout() {
    const result = await authClient.signOut();

    if (result.error) {
      console.error("Logout failed:", result.error.message);
      return;
    }

    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white">
      {/* Brand and authentication */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🛒</span>
          <span>
            <span className="block text-lg font-extrabold text-emerald-800">
              বাজার দর
            </span>
            <span className="block text-xs text-gray-500">
              {date || "বাংলাদেশের দৈনিক বাজার"}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {!isPending &&
            (session?.user ? (
              <>
                <Link
                  href="/profile"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
                >
                  প্রোফাইল
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                >
                  লগ আউট
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                >
                  সাইন আপ
                </Link>
              </>
            ))}
        </div>
      </div>

      {/* Category navigation */}
      <nav className="mx-auto flex max-w-6xl gap-5 overflow-x-auto px-4 pb-3 text-sm">
        {categories.map((category, index) => (
          <a
            key={category.name}
            href={category.href}
            className={`shrink-0 pb-1 ${
              index === 0
                ? "border-b-2 border-emerald-700 font-bold text-emerald-800"
                : "text-gray-600 hover:text-emerald-700"
            }`}
          >
            {category.name}
          </a>
        ))}
      </nav>

      {/* Scrolling market ticker */}
      <div className="overflow-hidden border-t border-gray-100 bg-emerald-50 py-2">
        <div className="ticker-track flex w-max items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {tickerItems.map((item, index) => (
                <span
                  key={`${copy}-${index}`}
                  className="mx-5 flex shrink-0 items-center gap-2 text-xs"
                >
                  <span>{item.emoji}</span>
                  <span className="font-medium text-gray-700">
                    {item.name}
                  </span>
                  <span className="text-gray-600">{item.price}</span>
                  <span
                    className={
                      item.change.startsWith("▲")
                        ? "font-semibold text-emerald-700"
                        : item.change.startsWith("▼")
                          ? "font-semibold text-red-600"
                          : "text-gray-500"
                    }
                  >
                    {item.change}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}