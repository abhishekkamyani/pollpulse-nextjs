"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Edit3, ExternalLink, Trash2, Vote, Check } from "lucide-react"

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

const MOCK_POLL = {
  id: "poll-8942",
  question: "Which framework layout structure are you planning to use for your 2026 production applications?",
  description: "Cast your vote on core architecture trends shaping full-stack application development scalability.",
  totalVotes: 1420,
  isCreator: true,
  options: [
    { id: "opt-1", label: "Next.js App Router", votes: 680 },
    { id: "opt-2", label: "Remix / React Router Vite", votes: 410 },
    { id: "opt-3", label: "SvelteKit Native Layouts", votes: 210 },
    { id: "opt-4", label: "SolidStart / Astro Hybrid", votes: 120 },
  ]
}

export default function PollDetailPage() {
  const [poll, setPoll] = useState(MOCK_POLL)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)

  const handleVoteSubmit = () => {
    if (!selectedOptionId) return
    
    console.log("🗳️ Action: Cast Vote Submitted")
    console.log(`Poll Target ID: ${poll.id}`)
    console.log(`Selected Target Option: ${selectedOptionId}`)

    setPoll(prev => ({
      ...prev,
      totalVotes: prev.totalVotes + 1,
      options: prev.options.map(o => o.id === selectedOptionId ? { ...o, votes: o.votes + 1 } : o)
    }))
    setHasVoted(true)
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10 space-y-8">
      
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
          <Link href="/polls">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to polls</span>
          </Link>
        </Button>

        {poll.isCreator && (
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" onClick={() => console.log("Edit:", poll.id)}>
              <Edit3 className="h-3.5 w-3.5" /> Edit
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs text-destructive hover:bg-destructive/10" onClick={() => console.log("Delete:", poll.id)}>
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </Button>
          </div>
        )}
      </div>

      {/* Main Card Booth */}
      <Card className="shadow-md border border-border/60">
        <CardHeader className="space-y-3">
          <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/10 border-none font-semibold">
            Active Voting Booth
          </Badge>
          <CardTitle className="text-xl md:text-2xl font-bold tracking-tight leading-tight">
            {poll.question}
          </CardTitle>
          <CardDescription>{poll.description}</CardDescription>
        </CardHeader>

        <CardContent>
          {hasVoted ? (
            <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-center">
              <p className="text-sm font-semibold text-emerald-600 flex items-center justify-center gap-2">
                <Check className="h-4 w-4 stroke-3" /> Stance recorded successfully!
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {poll.options.map((option) => {
                const isSelected = selectedOptionId === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedOptionId(option.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-lg border text-sm font-medium transition-all outline-none",
                      isSelected 
                        ? "border-primary bg-primary/5 ring-1 ring-primary/40 text-foreground" 
                        : "border-border/80 bg-background hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-4 w-4 rounded-full border flex items-center justify-center shrink-0",
                        isSelected ? "border-primary bg-primary" : "border-muted-foreground/40"
                      )}>
                        {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </div>
                      <span>{option.label}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </CardContent>

        {!hasVoted && (
          <CardFooter className="border-t bg-muted/20 px-6 py-4 flex justify-end">
            <Button onClick={handleVoteSubmit} disabled={!selectedOptionId} className="gap-2">
              <Vote className="h-4 w-4" /> Submit Vote
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Below the Fold: Real-Time Preview Insights */}
      <div className="space-y-4 pt-4 border-t border-dashed border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground/70">Live Standings Preview</h2>
          <Button variant="link" size="sm" className="gap-1 text-xs text-muted-foreground hover:text-primary p-0 h-auto">
            <Link href={`/polls/${poll.id}/results`}>
              <span>View full results panel</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </Button>
        </div>

        <div className="space-y-2">
          {poll.options.map((option) => {
            const percentage = Math.round((option.votes / poll.totalVotes) * 100)
            return (
              <div key={option.id} className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                  <span className="truncate pr-4">{option.label}</span>
                  <span className="tabular-nums shrink-0">{hasVoted ? `${percentage}% (${option.votes} votes)` : "Hidden until vote cast"}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div 
                    className={cn("h-full bg-primary/70 transition-all duration-500", !hasVoted && "w-0")}
                    style={{ width: hasVoted ? `${percentage}%` : "0%" }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}