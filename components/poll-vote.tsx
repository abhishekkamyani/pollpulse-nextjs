"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { ArrowLeft, Edit3, ExternalLink, Trash2, Vote, Check, Loader2, ShieldAlert, CheckCircle2, CalendarDays, User, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { PollDetails } from "@/lib/types"
import { castVote } from "@/actions/vote.action"
import { deletePoll } from "@/actions/poll.action"
import { DeleteButton } from "./delete-button"
import { format } from "date-fns"

export function PollVote({ poll }: { poll: PollDetails }) {
    const [selectedOptionId, setSelectedOptionId] = useState<number | null>(
        poll.pollVote?.optionIndex ?? null
    )
    const [hasVoted, setHasVoted] = useState(poll.pollVote?.isVoted ?? false)
    const [isPending, startTransition] = useTransition()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const isCreator = poll.isCreator
    const alreadyVoted = poll.pollVote?.isVoted ?? false
    const isLocked = isCreator || alreadyVoted || hasVoted

    const handleVoteSubmit = () => {
        if (isCreator) {
            setErrorMessage("You cannot vote on your own poll.")
            return
        }
        if (selectedOptionId === null) {
            setErrorMessage("Please select an option to vote.")
            return
        }
        setErrorMessage(null)
        startTransition(async () => {
            const result = await castVote(poll._id, selectedOptionId)
            if (!result.success) {
                setErrorMessage(result.error || "An unexpected error occurred.")
                return
            }
            setHasVoted(true)
        })
    }

    // Format helpers
    const formatDatetime = (date: Date) => format(new Date(date), "hh:mm a MMM d, yyyy")
    const isExpired = poll.expiresAt && new Date(poll.expiresAt) < new Date()

    return (
        <div className="mx-auto max-w-xl px-4 py-10 space-y-8">

            {/* Top Header Row */}
            <div className="flex items-center justify-between">
                <Link href="/polls" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground px-2 py-1.5 rounded-md hover:bg-accent transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to polls</span>
                </Link>

                {isCreator && (
                    <div className="flex items-center gap-1.5">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg text-muted-foreground/70 hover:text-foreground hover:bg-background/80 transition-all duration-200"
                        >
                            <Link href={`/polls/${poll._id}/update`}>
                                <Edit3 className="h-4 w-4" />
                                <span className="sr-only">Edit Poll</span>
                            </Link>
                        </Button>
                        <DeleteButton id={poll._id.toString()} deleteAction={deletePoll} />
                    </div>
                )}
            </div>

            {/* Main Card */}
            <Card className="border border-border bg-white dark:bg-zinc-900 shadow-md overflow-hidden">

                <CardHeader className="space-y-3 pb-4 border-b border-border/50">

                    {/* Status badge */}
                    {isCreator ? (
                        <Badge className="w-fit gap-1.5 bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border border-amber-300 dark:border-amber-700 hover:bg-amber-100">
                            <ShieldAlert className="h-3 w-3" /> Your poll
                        </Badge>
                    ) : hasVoted || alreadyVoted ? (
                        <Badge className="w-fit gap-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100">
                            <Check className="h-3 w-3" /> Voted
                        </Badge>
                    ) : (
                        <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/10 border-none font-semibold">
                            Active Voting Booth
                        </Badge>
                    )}

                    <CardTitle className="text-xl md:text-2xl font-bold tracking-tight leading-tight">
                        {poll.question}
                    </CardTitle>

                    {/* Meta row — createdBy (only for non-creator), createdAt, expiresAt */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-0.5">

                        {/* Show creator name only to non-creator visitors */}
                        {!isCreator && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                                <User className="h-3.5 w-3.5 shrink-0" />
                                By {poll.createdBy}
                            </span>
                        )}

                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                            {formatDatetime(poll.createdAt)}
                        </span>

                        {poll.expiresAt ? (
                            <span className={cn(
                                "inline-flex items-center gap-1.5 text-xs",
                                isExpired
                                    ? "text-destructive"
                                    : "text-muted-foreground"
                            )}>
                                <Clock className="h-3.5 w-3.5 shrink-0" />
                                {isExpired
                                    ? `Expired ${formatDatetime(poll.expiresAt)}`
                                    : `Expires ${formatDatetime(poll.expiresAt)}`}
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Clock className="h-3.5 w-3.5 shrink-0" />
                                No expiration
                            </span>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="pt-5 space-y-4">

                    {/* Creator notice banner */}
                    {isCreator && (
                        <div className="flex items-start gap-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 p-3.5">
                            <ShieldAlert className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                                    Voting disabled
                                </p>
                                <p className="text-xs text-amber-700/80 dark:text-amber-400/80 mt-0.5 leading-relaxed">
                                    You created this poll. Creators can't vote on their own polls to keep results fair.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Revisit voted state */}
                    {(hasVoted || alreadyVoted) && !isCreator ? (
                        <div className="space-y-3">
                            <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 p-3.5 flex items-center gap-2.5">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                <div>
                                    <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                                        Vote recorded
                                    </p>
                                    <p className="text-xs text-emerald-700/70 dark:text-emerald-400/70 mt-0.5">
                                        Your selection is highlighted below.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2.5">
                                {poll.options.map((option, idx) => {
                                    const isSelected = poll.pollVote?.optionIndex === idx || selectedOptionId === idx
                                    return (
                                        <div
                                            key={idx.toString()}
                                            className={cn(
                                                "w-full text-left p-4 rounded-lg border text-sm font-medium",
                                                isSelected
                                                    ? "border-primary bg-primary/5 ring-1 ring-primary/40 text-foreground"
                                                    : "border-border/50 bg-muted/10 text-muted-foreground opacity-60"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "h-4 w-4 rounded-full border flex items-center justify-center shrink-0",
                                                    isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                                                )}>
                                                    {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                                                </div>
                                                <span>{option}</span>
                                                {isSelected && (
                                                    <span className="ml-auto text-[10px] font-bold text-primary uppercase tracking-wider">
                                                        Your vote
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ) : (
                        /* Normal voting options */
                        <div className="space-y-2.5">
                            {poll.options.map((option, idx) => {
                                const isSelected = selectedOptionId === idx
                                return (
                                    <button
                                        key={idx.toString()}
                                        type="button"
                                        onClick={() => !isLocked && setSelectedOptionId(idx)}
                                        disabled={isLocked}
                                        className={cn(
                                            "w-full text-left p-4 rounded-lg border text-sm font-medium transition-all outline-none",
                                            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                                            isCreator && "cursor-not-allowed opacity-50 border-border/40 bg-muted/20",
                                            !isCreator && !isSelected && "border-border bg-muted/10 hover:bg-muted/40 text-muted-foreground hover:text-foreground cursor-pointer",
                                            !isCreator && isSelected && "border-primary bg-primary/5 ring-1 ring-primary/40 text-foreground",
                                            isPending && "opacity-60 cursor-wait"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "h-4 w-4 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                                                isSelected && !isCreator
                                                    ? "border-primary bg-primary"
                                                    : "border-muted-foreground/40"
                                            )}>
                                                {isSelected && !isCreator && (
                                                    <div className="h-1.5 w-1.5 rounded-full bg-white" />
                                                )}
                                            </div>
                                            <span>{option}</span>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    )}
                </CardContent>

                <CardFooter className="border-t border-border/50 bg-muted/20 px-6 py-4 flex items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                        {isCreator
                            ? "Creator view — read only"
                            : hasVoted || alreadyVoted
                                ? "Thanks for participating"
                                : "Select an option above"}
                    </p>

                    {isCreator ? (
                        <Link href={`/polls/${poll._id}/results`} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-border bg-background hover:bg-accent transition-colors font-medium">
                            View results
                        </Link>
                    ) : hasVoted || alreadyVoted ? (
                        <Badge className="w-fit bg-primary text-white py-1 px-3 rounded-full border-none font-semibold gap-1.5 text-xs">
                            <Check className="h-3 w-3" /> Already voted
                        </Badge>
                    ) : (
                        <Button
                            onClick={handleVoteSubmit}
                            disabled={isPending || selectedOptionId === null}
                            className="gap-2"
                        >
                            {isPending ? (
                                <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>
                            ) : (
                                <><Vote className="h-4 w-4" /> Submit Vote</>
                            )}
                        </Button>
                    )}
                </CardFooter>
            </Card>

            {/* Below the Fold: Live Standings */}
            <div className="space-y-4 pt-4 border-t border-dashed border-border">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-foreground/70">Live Standings Preview</h2>
                    <Link href={`/polls/${poll._id}/results`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <span>View full results panel</span>
                        <ExternalLink className="h-3 w-3" />
                    </Link>
                </div>
            </div>

            {/* Error message */}
            {errorMessage && (
                <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-center">
                    <p className="text-sm font-medium text-destructive">{errorMessage}</p>
                </div>
            )}

        </div>
    )
}