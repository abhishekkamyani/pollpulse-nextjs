import Link from "next/link"
import {
  BarChart2,
  Calendar,
  Edit3,
  FolderPlus,
  Inbox,
  Plus,
  Trash2
} from "lucide-react"

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
import { deletePoll, getYourPolls } from "@/actions/poll.action"
import { DeleteButton } from "@/components/delete-button"

export default async function DashboardPage() {

  const response = await getYourPolls();
  const polls = response.data || [];

  console.log("==response==", response);

  // const handleDeletePoll = (id: string) => {
  //   console.log(`❌ Action: Delete requested for Poll ID: ${id}`)
  //   // Filter out item locally to simulate live database deletion cycle
  //   setPolls(prev => prev.filter(poll => poll._id !== id))
  // }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-10">

      {/* Top Main Control Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6 border-border/60">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">My Polls</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage, track performance analytics, and audit your active audience queries.
          </p>
        </div>

        {polls.length > 0 && (
          <Button size="sm" className="gap-2 shrink-0 self-start sm:self-auto shadow-sm">
            <Link href="/polls/create">
              <Plus className="h-4 w-4 stroke-[2.5]" />
              <span>Create new poll</span>
            </Link>
          </Button>
        )}
      </div>

      {/* Main Content Area Layout Switch */}
      {polls.length === 0 ? (

        /* Empty State Blueprint Placement Section */
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto py-16 px-4 rounded-xl border border-dashed border-border/80 bg-muted/15">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-4">
            <Inbox className="h-6 w-6 stroke-[1.5]" />
          </div>
          <h3 className="text-lg font-semibold text-foreground/90">You have not created any polls yet</h3>
          <p className="text-sm text-muted-foreground mt-1.5 mb-6">
            Get started by creating your first interactive questionnaire card layout to share out with your network.
          </p>
          <Button className="gap-2 px-5">
            <Link href="/polls/create">
              <FolderPlus className="h-4 w-4" />
              <span>Create Your First Poll</span>
            </Link>
          </Button>
        </div>

      ) : (

        /* Active Population Grid Display */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {polls.map((poll) => {
            const today = new Date();
            const status = poll.expiresAt ? (poll.expiresAt < today ? "expired" : "active") : "active";
            const isActive = status === "active"

            return (
              <Card
                key={poll._id.toString()}
                className="flex flex-col justify-between shadow-md border border-border/60 hover:border-border transition-all duration-200 bg-background/50"
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    {/* Status Badge Accent Gateway */}
                    <Badge
                      variant="secondary"
                      className={cn(
                        "font-medium border-none pointer-events-none text-xs px-2.5 py-0.5 capitalize",
                        isActive
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {status}
                    </Badge>

                    {/* Metadata Context Row */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                      <Calendar className="h-3.5 w-3.5 opacity-70" />
                      <span>{poll.createdAt.toDateString()}</span>
                    </div>
                  </div>

                  <CardTitle className="text-base md:text-lg font-bold tracking-tight text-foreground/90 leading-snug line-clamp-2 pt-1">
                    <Link href={`/polls/${poll._id}`} className="hover:text-primary transition-colors">
                      {poll.question}
                    </Link>
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center gap-2 rounded-md bg-muted/40 border px-3 py-2 w-fit">
                    <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-semibold text-foreground/80 tabular-nums">
                      {poll.votes.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground font-normal">votes cast</span>
                  </div>
                </CardContent>

                <CardFooter className="border-t bg-muted/10 px-6 py-3.5 flex items-center justify-between gap-2">
                  <Button
                    variant="link"
                    size="sm"

                    className="h-auto p-0 text-xs text-muted-foreground hover:text-primary font-medium"
                  >
                    <Link href={`/polls/${poll._id}/results`}>
                      View full results
                    </Link>
                  </Button>

                  <div className="flex">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      // onClick={() => console.log(`Edit Request targeted for: ${poll._id}`)}
                    >
                      <Link href={`/polls/${poll._id}/update`}><Edit3 className="h-4 w-4" /></Link>
                    </Button>
                    {/* <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => deletePoll(poll._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button> */}
                    <DeleteButton id={poll._id.toString()} deleteAction={deletePoll}  />
                  </div>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}

    </div>
  )
}