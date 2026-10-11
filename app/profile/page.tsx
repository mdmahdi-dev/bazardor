
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileForm from "@/components/ProfileForm";

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

console.log("Profile user:", session.user);

    return (
        <main className="min-h-screen bg-emerald-50 px-4 py-12">
            <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
                <h1 className="mb-2 text-3xl font-bold text-emerald-800">
                    আমার প্রোফাইল
                </h1>

                <p className="mb-6 text-gray-600">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>

                <ProfileForm
                    name={session.user.name}
                    email={session.user.email}
                />

                <p className="mt-6 text-sm text-gray-500">
                    আপনার অ্যাকাউন্ট সফলভাবে লগ ইন করা আছে।
                </p>
            </div>
        </main>
    );
}