
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Clock 
} from "lucide-react";

export const LandingView = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-125 bg-linear-to-b from-primary/5 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 text-center sm:pt-32">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border/80 text-xs font-medium text-muted-foreground mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <Zap className="w-3.5 h-3.5 text-primary fill-primary/10" />
          <span>Now live: Real-time dynamic charting</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground max-w-3xl mx-auto leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          Create Instant Polls. <br />
          <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Gather Real-Time Feedback.
          </span>
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          Connect with your community, back decisions with data, and watch opinions shift dynamically with beautiful live visualizations.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Button size="lg" className="gap-2 h-12 px-6 text-base w-full sm:w-auto shadow-sm shadow-primary/20">
            <Link href="/login" className="flex items-center gap-2">
              Create a Poll
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-6 text-base w-full sm:w-auto border-border/80 bg-background/50 backdrop-blur-sm">
            <Link href="/login">
              Explore Public Polls
            </Link>
          </Button>
        </div>
      </section>

      {/* Feature Metrics/Social Proof Section */}
      <section className="border-y border-border/40 bg-muted/30 backdrop-blur-xs py-10 w-full">
        <div className="mx-auto max-w-5xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold tracking-tight text-foreground">100k+</h3>
            <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wider">Votes Cast</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold tracking-tight text-foreground">15k+</h3>
            <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wider">Active Polls</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold tracking-tight text-foreground">&lt; 1s</h3>
            <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wider">Live Sync Speed</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold tracking-tight text-foreground">99.9%</h3>
            <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wider">Uptime Promise</p>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to capture sentiment
          </h2>
          <p className="text-muted-foreground mt-4">
            Powerful features built to maximize engagement while guaranteeing data integrity.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="group relative rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-border hover:shadow-md hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2">Live Dynamic Visuals</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Watch results compute instantly. Beautiful analytics charts update in true real-time as users cast their votes.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group relative rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-border hover:shadow-md hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2">Fraud Prevention</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Keep insights authentic. Robust fingerprinting and verification prevent duplicate voting and bot inflation.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group relative rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-border hover:shadow-md hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2">Timed Expirations</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Set deadlines on your queries. Polls naturally close and switch to final read-only summary cards automatically.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Call to Action Section */}
      <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
        <div className="rounded-3xl border border-border/60 bg-linear-to-b from-muted/50 to-muted/20 px-6 py-12 sm:py-16 sm:px-12 relative overflow-hidden">
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to hear what your people think?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-muted-foreground">
            Sign up in seconds, deploy unlimited custom surveys, and streamline your strategic crowd-sourced decisions today.
          </p>
          <div className="mt-8 flex justify-center">
            <Button size="lg" className="h-11 px-6 shadow-sm">
              <Link href="/login">Get Started for Free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Clean Minimalist Footer */}
      <footer className="border-t border-border/40 py-6 text-center text-xs text-muted-foreground w-full bg-background">
        <p>&copy; {new Date().getFullYear()} PollApp. All rights reserved.</p>
      </footer>
    </div>
  );
}