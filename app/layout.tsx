import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import AuthProvider from "./providers";

// Global fallback metadata configuration
export const metadata: Metadata = {
  title: {
    default: "PollApp — Instant Real-Time Surveys",
    template: "%s | PollApp", // Child pages automatically prefix their title here
  },
  description: "Create real-time polls, gather dynamic feedback, and watch live charts sync instantly.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!), // Crucial for absolute OG image paths
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