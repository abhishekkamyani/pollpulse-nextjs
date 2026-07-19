import { createPoll } from "@/actions/poll.action"
import { PollForm } from "@/components/poll-form"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

export default function CreatePollPage() {

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <Card className="shadow-md border border-border/60">
        <CardHeader className="space-y-1.5">
          <CardTitle className="text-2xl font-bold tracking-tight">Create a Poll</CardTitle>
          <CardDescription>
            Get real-time feedback from your community instantly.
          </CardDescription>
        </CardHeader>
        <PollForm action={createPoll} />
      </Card>
    </div>
  )
}