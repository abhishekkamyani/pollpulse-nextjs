"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const callbackUrl = params.get("callbackUrl") || "/dashboard";

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push(callbackUrl);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-xl border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-medium mb-2">Welcome back</h1>
        {params.get("registered") && (
          <p className="text-green-600 text-sm mb-4">Account created. Please login.</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <input name="email" type="email" placeholder="Email" required
            className="border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700" />
          <input name="password" type="password" placeholder="Password" required
            className="border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700" />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={loading}
            className="bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4">
          No account? <Link href="/register" className="text-blue-600">Register</Link>
        </p>
      </div>
    </div>
  );
}