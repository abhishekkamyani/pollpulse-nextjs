// app/global-error.tsx
"use client"

export default function GlobalError({
//   error,
  reset,
}: {
//   error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="flex min-h-screen flex-col items-center justify-center p-4 bg-background text-foreground">
        <h2 className="text-xl font-bold">Something went critically wrong!</h2>
        <button
          onClick={() => reset()}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Try again
        </button>
      </body>
    </html>
  )
}