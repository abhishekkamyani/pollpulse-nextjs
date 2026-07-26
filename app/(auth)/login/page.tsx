"use client";
import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
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

    // FIX: always use a relative path — never build an absolute URL
    // absolute URLs with window.location.origin cause NextAuth to behave
    // differently in production vs localhost
    const rawCallback = params.get("callbackUrl") || "/dashboard";
    const callbackUrl = rawCallback.startsWith("http")
      ? new URL(rawCallback).pathname  // strip domain if absolute, keep only path
      : rawCallback;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        // FIX: removed callbackUrl from signIn call entirely —
        // passing it here causes NextAuth to do its own redirect
        // logic which conflicts with redirect: false on Vercel
      });

      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false); // FIX: only stop loading on error — not in finally
        return;
      }

      // FIX: router.refresh() before push forces the server session to
      // update so protected routes don't redirect back to login
      router.refresh();
      router.push(callbackUrl);
      // intentionally NOT calling setLoading(false) here —
      // keep spinner showing during navigation so user sees feedback
    } catch (err) {
      setError("Unable to sign in. Please try again.");
      setLoading(false);
    }
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}