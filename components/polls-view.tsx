import Link from "next/link"
import {
  BarChart2,
  Calendar,
  Inbox,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { getPolls } from "@/actions/poll.action"

export async function PollsView() {
  // --- HANDLE YOUR LOGIC HERE ---
  // Fetch all polls except the current user's polls
  const response = await getPolls();
  console.log("Fetched polls:", response);
  const polls = response.data || [];
  // ------------------------------

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-10 md:py-14 space-y-8 antialiased">
      
      {/* Community Header System */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b pb-6 border-border/60">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Explore Polls
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Discover active queries from the community, cast your vote, and track live public insights.
          </p>
        </div>
      </div>

      {/* Interface Rendering Node */}
      {polls.length === 0 ? (
        
        /* High-Contrast Public Empty State Blueprint */
        <div className="relative flex flex-col items-center justify-center text-center max-w-lg mx-auto py-24 px-8 rounded-2xl border border-dashed border-border/80 bg-card shadow-sm mt-12">
          <div className="h-14 w-14 rounded-2xl bg-muted border border-border/50 flex items-center justify-center text-muted-foreground/70 mb-5 shadow-inner">
            <Inbox className="h-6 w-6 stroke-[1.5]" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-foreground/90">No external polls available</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-sm leading-relaxed">
            It looks like there are no other community polls active right now. Check back later to view and vote on new submissions.
          </p>
        </div>

      ) : (

        /* Widescreen Responsive 4-Column Presentation Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {polls.map((poll) => {
            const today = new Date();
            const status = poll.expiresAt ? (poll.expiresAt < today ? "expired" : "active") : "active";
            const isActive = status === "active";

            return (
              <Card
                key={poll._id.toString()}
                className="group flex flex-col justify-between overflow-hidden bg-card border border-border/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-border transition-all duration-300 rounded-xl"
              >
                <CardHeader className="space-y-3.5 pb-4">
                  <div className="flex items-center justify-between gap-4">
                    {/* Status Pill Badges */}
                    <Badge
                      variant="secondary"
                      className={cn(
                        "font-semibold tracking-wide border-none pointer-events-none text-[10px] px-2.5 py-0.5 capitalize shadow-sm",
                        isActive
                          ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                          : "bg-muted text-muted-foreground/90"
                      )}
                    >
                      {status}
                    </Badge>

                    {/* Metadata Creation Context */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium opacity-80">
                      <Calendar className="h-3.5 w-3.5 opacity-60" />
                      <span>{poll.createdAt.toDateString()}</span>
                    </div>
                  </div>

                  {/* Clean Uniform Line-Clamped Titles */}
                  <CardTitle className="text-base font-bold tracking-tight text-foreground/90 leading-snug line-clamp-2 pt-1 min-h-11">
                    <Link href={`/polls/${poll._id}`} className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline">
                      {poll.question}
                    </Link>
                  </CardTitle>
                </CardHeader>

                {/* Public Engagement Trackers */}
                <CardContent className="pb-5">
                  <div className="flex items-center gap-2 rounded-xl bg-muted/50 border border-border/40 px-3.5 py-2 w-fit group-hover:bg-muted/80 transition-colors duration-300">
                    <BarChart2 className="h-4 w-4 text-muted-foreground/80" />
                    <span className="text-sm font-bold text-foreground/80 tabular-nums">
                      {poll.votes.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground/70 font-medium">votes cast</span>
                  </div>
                </CardContent>

                {/* Clean Consumer Isolated Action Footer */}
                <CardFooter className="border-t border-border/50 bg-muted/10 group-hover:bg-muted/20 px-5 py-3.5 flex items-center justify-between gap-4 transition-colors duration-300">
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-xs text-muted-foreground/80 hover:text-primary font-semibold tracking-wide transition-colors"
                  >
                    <Link href={`/polls/${poll._id}`}>
                      {isActive ? "Cast your vote" : "View full results"}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}