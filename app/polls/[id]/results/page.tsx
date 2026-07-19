"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, BarChart3, Check, Copy, Share2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"

const MOCK_RESULTS = {
  id: "poll-8942",
  question: "Which framework layout structure are you planning to use for your 2026 production applications?",
  totalVotes: 1420,
  options: [
    { id: "opt-1", label: "Next.js App Router", votes: 680 },
    { id: "opt-2", label: "Remix / React Router Vite", votes: 410 },
    { id: "opt-3", label: "SvelteKit Native Layouts", votes: 210 },
    { id: "opt-4", label: "SolidStart / Astro Hybrid", votes: 120 },
  ]
}

export default function PollResultsPage() {
  const [copied, setCopied] = useState(false)
  
  const maxVotes = Math.max(...MOCK_RESULTS.options.map(o => o.votes))

  const handleShareCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Unable to copy route address location:", err)
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 space-y-6">
      
      {/* Navigation Return Hook */}
      <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground mb-2">
        <Link href={`/polls/${MOCK_RESULTS.id}`}>
          <ArrowLeft className="h-4 w-4" />
          <span>Back to poll booth</span>
        </Link>
      </Button>

      {/* Graphical Dashboard Panel */}
      <Card className="shadow-lg border border-border/80 overflow-hidden">
        <CardHeader className="space-y-3.5 border-b bg-muted/20">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-primary font-medium text-sm">
              <BarChart3 className="h-4 w-4" />
              <span>Final Standings Breakdown</span>
            </div>
            <Badge variant="secondary" className="font-bold font-mono px-2.5 py-0.5 text-xs">
              {MOCK_RESULTS.totalVotes.toLocaleString()} Total Votes
            </Badge>
          </div>
          <CardTitle className="text-xl md:text-2xl font-bold tracking-tight text-foreground leading-snug">
            {MOCK_RESULTS.question}
          </CardTitle>
          <CardDescription>
            Live global breakdown distribution across all tracked choice vectors.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 space-y-4">
          {MOCK_RESULTS.options.map((option) => {
            const percentage = Math.round((option.votes / MOCK_RESULTS.totalVotes) * 100)
            const isWinner = option.votes === maxVotes

            return (
              <div 
                key={option.id}
                className={cn(
                  "relative w-full min-h-13 rounded-lg border transition-all duration-300 overflow-hidden flex items-center bg-background",
                  isWinner ? "border-primary/50 shadow-sm ring-1 ring-primary/10" : "border-border/70"
                )}
              >
                {/* Horizontal Graphic Fill Track */}
                <div 
                  className={cn(
                    "absolute inset-y-0 left-0 transition-all duration-1000 ease-out",
                    isWinner ? "bg-primary/15" : "bg-muted/60"
                  )}
                  style={{ width: `${percentage}%` }}
                />

                {/* Inline Data Layout Flexbox */}
                <div className="relative z-10 w-full flex items-center justify-between gap-4 px-4 py-3 text-sm font-medium">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={cn("truncate text-foreground/90", isWinner && "font-semibold text-foreground")}>
                      {option.label}
                    </span>
                    {isWinner && (
                      <Badge className="h-4 px-1.5 text-[9px] font-extrabold uppercase tracking-wider bg-primary text-primary-foreground pointer-events-none shrink-0 border-none">
                        Winner
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0 tabular-nums text-muted-foreground">
                    <span className="text-xs font-normal">({option.votes.toLocaleString()})</span>
                    <span className={cn("font-bold text-base min-w-10.5 text-right", isWinner && "text-primary text-lg")}>
                      {percentage}%
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>

        {/* Global Distribution Clipboard Sharing Footer Link */}
        <CardFooter className="border-t bg-muted/10 px-6 py-4 flex items-center justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleShareCopy}
            className={cn("w-full sm:w-auto text-xs gap-2 transition-all", copied && "border-emerald-500 text-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/5")}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                Copied share URL!
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                Share results dashboard
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

    </div>
  )
}