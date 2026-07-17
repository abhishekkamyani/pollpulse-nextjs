"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    router.push("/login?registered=true");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-xl border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-medium mb-6">Create account</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="name" type="text" placeholder="Full name" required
            className="border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700" />
          <input name="email" type="email" placeholder="Email" required
            className="border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700" />
          <input name="password" type="password" placeholder="Password" required minLength={6}
            className="border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700" />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={loading}
            className="bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4">
          Already have an account? <Link href="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
}