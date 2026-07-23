import Link from "next/link"
import { ArrowLeft, BarChart3, Trophy, Users, Clock, CalendarDays } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getPollResults } from "@/actions/poll.action"
import { CopyUrlButton } from "@/components/copy-url-button"
// import { headers } from "next/headers"
// import { redirect } from "next/navigation"

interface PollResultsPageProps {
  params: Promise<{ id: string }>
}

export default async function PollResultsPage({ params }: PollResultsPageProps) {
  const { id } = await params;
  const response = await getPollResults(id)

  const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/polls/results/${id}`, { cache: "no-store" });
  console.log("==apiResponse==", apiResponse)
  // const contentType = apiResponse.headers.get('content-type');
  // if (!contentType || !contentType.includes('application/json')) {
  //   // throw new Error('Unauthorized or invalid response');
  //   redirect('/api/auth/signin')
  //   // return <h1>Error</h1>
  // }

  const apiData = await apiResponse.json();

  // if (!response.success || !apiData.success) return <h1>Error: needs to create error file</h1>
  if (!response.success) return <h1>Error: needs to create error file</h1>

  // const poll = apiData.data
  const poll = response.data

  const totalVotes = poll.options.reduce((acc, o) => acc + o.voteCount, 0)
  const maxVotes = Math.max(...poll.options.map(o => o.voteCount))
  const winnersCount = poll.options.filter(o => o.voteCount === maxVotes).length

  const today = new Date()
  const isExpired = poll.expiresAt && new Date(poll.expiresAt) < today
  const status = isExpired ? "expired" : "active"

  const getPercentage = (count: number) =>
    totalVotes === 0 ? 0 : Math.round((count / totalVotes) * 100)

  return (
    <div className="mx-auto max-w-xl px-4 py-10 space-y-6">

      {/* Back link */}
      <Link
        href={`/polls/${id}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground px-2 py-1.5 rounded-md hover:bg-accent transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to poll
      </Link>

      {/* Results card */}
      <Card className="border border-border bg-white dark:bg-zinc-900 shadow-md overflow-hidden">

        <CardHeader className="space-y-3 pb-4 border-b border-border/50">

          {/* Top row: icon label + status badge */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <BarChart3 className="h-4 w-4" />
              Results
            </div>
            {isExpired ? (
              <Badge className="bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 text-xs font-medium">
                Closed
              </Badge>
            ) : (
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100 text-xs font-medium">
                Live
              </Badge>
            )}
          </div>

          <CardTitle className="text-xl md:text-2xl font-bold tracking-tight leading-snug">
            {poll.question}
          </CardTitle>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-0.5">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5 shrink-0" />
              {totalVotes.toLocaleString()} {totalVotes === 1 ? "vote" : "votes"}
            </span>
            {poll.expiresAt && (
              <span className={cn(
                "inline-flex items-center gap-1.5 text-xs",
                isExpired ? "text-destructive" : "text-muted-foreground"
              )}>
                <Clock className="h-3.5 w-3.5 shrink-0" />
                {isExpired
                  ? `Closed ${format(new Date(poll.expiresAt), "MMM d, yyyy")}`
                  : `Closes ${format(new Date(poll.expiresAt), "MMM d, yyyy")}`}
              </span>
            )}
            {poll.createdAt && (
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                {format(new Date(poll.createdAt), "MMM d, yyyy")}
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-5 space-y-3">
          {totalVotes === 0 ? (
            <div className="py-10 text-center space-y-1.5">
              <p className="text-sm font-medium text-muted-foreground">No votes yet</p>
              <p className="text-xs text-muted-foreground/70">Results will appear once people start voting.</p>
            </div>
          ) : (
            poll.options.map((option, idx) => {
              const percentage = getPercentage(option.voteCount)
              const isWinner = maxVotes !== 0 && option.voteCount === maxVotes
              const WIN = status === "expired" ? "Winner" : "Winning"
              const TIE = status === "expired" ? "Tied" : "Tying"

              return (
                <div
                  key={idx}
                  className={cn(
                    "relative w-full rounded-lg border overflow-hidden",
                    isWinner
                      ? "border-primary/40 ring-1 ring-primary/10"
                      : "border-border/60"
                  )}
                >
                  {/* Progress fill track */}
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 transition-all duration-700 ease-out",
                      isWinner ? "bg-primary/10" : "bg-muted/50"
                    )}
                    style={{ width: `${percentage}%` }}
                  />

                  {/* Content row */}
                  <div className="relative z-10 flex items-center justify-between gap-3 px-4 py-3.5">

                    {/* Left: trophy + label + badge */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      {isWinner && maxVotes !== 0 && (
                        <Trophy className={cn(
                          "h-3.5 w-3.5 shrink-0",
                          winnersCount > 1 ? "text-muted-foreground" : "text-primary"
                        )} />
                      )}
                      <span className={cn(
                        "text-sm truncate",
                        isWinner ? "font-semibold text-foreground" : "font-medium text-foreground/80"
                      )}>
                        {option.label}
                      </span>
                      {isWinner && maxVotes !== 0 && (
                        <Badge className="shrink-0 h-4.5 px-1.5 text-[9px] font-bold uppercase tracking-wide bg-primary text-primary-foreground border-none pointer-events-none">
                          {winnersCount > 1 ? TIE : WIN}
                        </Badge>
                      )}
                    </div>

                    {/* Right: vote count + percentage */}
                    <div className="flex items-center gap-2 shrink-0 tabular-nums">
                      <span className="text-xs text-muted-foreground">
                        {option.voteCount.toLocaleString()}
                      </span>
                      <span className={cn(
                        "text-sm font-bold min-w-9 text-right",
                        isWinner ? "text-primary text-base" : "text-foreground/70"
                      )}>
                        {percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </CardContent>

        <CardFooter className="border-t border-border/50 bg-muted/20 px-5 py-3.5 flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            {totalVotes === 0
              ? "No votes recorded yet"
              : `${poll.options.length} options · ${totalVotes.toLocaleString()} total votes`}
          </p>
          <CopyUrlButton label="Share results" />
        </CardFooter>
      </Card>
    </div>
  )
}