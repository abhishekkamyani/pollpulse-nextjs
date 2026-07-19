import { LandingView } from "@/components/landing-view";
import { PollsView } from "@/components/polls-view";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { cache } from "react";

// Resolve a safe metadata base for building absolute image URLs
const _resolveMetadataBase = () => {
  const fallback = process.env.NODE_ENV === "production" ? "https://pollpulse-nextjs.vercel.app/" : "http://localhost:3000";
  const raw = process.env.NEXT_PUBLIC_APP_URL || fallback;
  try {
    return new URL(raw);
  } catch {
    try {
      return new URL(`https://${raw}`);
    } catch {
      return new URL(fallback);
    }
  }
};

const getSession = cache(() => auth());

export async function generateMetadata(): Promise<Metadata> {
  const session = await getSession();

  // 1. Metadata for Logged-In Users
  if (session?.user) {
    return {
      title: "Dashboard | PollApp",
      description: "Manage your active polls and view live community feedback.",
      // Tell search bots not to index or follow links on the private dashboard view
      robots: { index: false, follow: false },
    };
  }

  // 2. SEO Metadata for Logged-Out Visitors & Search Engine Crawlers
  const base = _resolveMetadataBase();

  return {
    title: "PollApp — Create Instant Real-Time Polls & Surveys",
    description: "Connect with your community, gather data-backed insights, and watch opinions shift instantly with live charting.",
    keywords: ["real-time polls", "live surveys", "community feedback", "dynamic charts"],

    // Open Graph (Controls how your link looks when shared on Discord, X/Twitter, WhatsApp)
    openGraph: {
      title: "PollApp — Create Instant Real-Time Polls",
      description: "Gather feedback instantly with beautiful, dynamic live-syncing visualizations.",
      url: base.toString(),
      siteName: "PollApp",
      images: [
        {
          url: new URL("/og-image.png", base).toString(),
          width: 1200,
          height: 630,
          alt: "PollApp Live Analytics Dashboard Preview",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "PollApp — Create Instant Real-Time Polls",
      description: "Gather feedback instantly with beautiful, dynamic live-syncing visualizations.",
      images: [new URL("/og-image.png", base).toString()],
    },
  };
}

export default async function Home() {
  const session = await getSession();

  if (session?.user && session?.user?.id) {
    return <PollsView />;
  }

  return <LandingView />
}
