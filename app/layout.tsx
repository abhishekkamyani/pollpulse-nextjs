import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import AuthProvider from "./providers";

// Build a safe metadata base URL from env with a dev fallback
const _resolveMetadataBase = () => {
  const fallback = process.env.NODE_ENV === "production" ? "https://example.com" : "http://localhost:3000";
  const raw = process.env.NEXT_PUBLIC_APP_URL || fallback;
  try {
    return new URL(raw);
  } catch {
    try {
      // attempt to prepend protocol if missing
      return new URL(`https://${raw}`);
    } catch {
      return new URL(fallback);
    }
  }
};

export const metadata: Metadata = {
  title: {
    default: "PollApp — Instant Real-Time Surveys",
    template: "%s | PollApp",
  },
  description: "Create real-time polls, gather dynamic feedback, and watch live charts sync instantly.",
  metadataBase: _resolveMetadataBase(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans")}
      suppressHydrationWarning
    >
      {/* 
        Using 'min-h-screen' or 'min-h-full' with 'flex flex-col' allows 
        the page layout to cleanly stretch and manage footers/navbars.
      */}
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
          {/* Global navigation menu */}
          <Navbar />
          
          {/* 
            Semantic main element pushes content to fill empty space, 
            keeping your layouts uniform across all sub-pages.
          */}
          <main className="flex-1 w-full flex flex-col">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}