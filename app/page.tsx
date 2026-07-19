import { LandingView } from "@/components/landing-view";
import { PollsView } from "@/components/polls-view";
import { auth } from "@/lib/auth";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();

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
  return {
    title: "PollApp — Create Instant Real-Time Polls & Surveys",
    description: "Connect with your community, gather data-backed insights, and watch opinions shift instantly with live charting.",
    keywords: ["real-time polls", "live surveys", "community feedback", "dynamic charts"],

    // Open Graph (Controls how your link looks when shared on Discord, X/Twitter, WhatsApp)
    openGraph: {
      title: "PollApp — Create Instant Real-Time Polls",
      description: "Gather feedback instantly with beautiful, dynamic live-syncing visualizations.",
      url: "/",
      siteName: "PollApp",
      images: [
        {
          url: "/og-image.png", // Path to your preview image in /public
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
      images: ["/og-image.png"],
    },
  };
}

export default async function Home() {
  const session = await auth();

  if (session?.user && session?.user?.id) {
    return <PollsView />;
  }

  return <LandingView />
}
