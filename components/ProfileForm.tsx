
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

type ProfileFormProps = {
  name: string;
  email: string;
};

export default function ProfileForm({ name, email }: ProfileFormProps) {
  const [newName, setNewName] = useState(name);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setSaving(true);

    try {
      const result = await authClient.updateUser({ name: newName.trim() });

      if (result.error) {
        setMessage(result.error.message || "প্রোফাইল আপডেট করা যায়নি।");
        return;
      }

      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে!");
    } catch {
      setMessage("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
          আপনার নাম
        </label>
        <input
          id="name"
          type="text"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          required
          minLength={2}
          maxLength={100}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
          ইমেইল
        </label>
        <input
          id="email"
          type="email"
          value={email}
          readOnly
          className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
        />
        <p className="mt-1 text-xs text-gray-500">
          ইমেইল পরিবর্তন করা যাচ্ছে না।
        </p>
      </div>

      <button
        type="submit"
        disabled={saving || !newName.trim() || newName.trim() === name}
        className="rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "সেভ হচ্ছে..." : "পরিবর্তন সেভ করুন"}
      </button>

      {message && (
        <p role="status" className="text-sm text-emerald-700">
          {message}
        </p>
      )}
    </form>
  );
}