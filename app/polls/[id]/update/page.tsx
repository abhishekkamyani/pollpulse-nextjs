import { notFound } from "next/navigation"
import { PollForm } from "@/components/poll-form"
import { updatePoll, getUserPollById } from "@/actions/poll.action"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PollFormValues, UpdatePollPageProps } from "@/lib/types";

export default async function UpdatePollPage({ params }: UpdatePollPageProps) {
    const { id } = await params;

    // 1. Fetch your dynamic poll data on the server
    const response = await getUserPollById(id); // Pass true to check author
    const poll = response?.data;
    if (!poll) return notFound();

    console.log("== poll data update page ==", poll);

    // 2. Pre-bind the ID to the update action
    const updateActionWithId = updatePoll.bind(null, id);

    // 3. Map database parameters safely back to form state expectations
    // Pass ISO string for expiresAt so the client converts to datetime-local in the browser
    const initialData : PollFormValues = {
        question: poll.question,
        options: poll.options.map((opt: any) => ({ value: opt })),
        expiresAt: poll.expiresAt ? new Date(poll.expiresAt).toISOString() : "",
    };

    console.log("== initial data update page", initialData)

    return (
        <div className="mx-auto max-w-xl px-4 py-12">
            <Card className="shadow-md border border-border/60">
                <CardHeader className="space-y-1.5">
                    <CardTitle className="text-2xl font-bold tracking-tight">Edit Poll</CardTitle>
                    <CardDescription>
                        Modify your query, add choices, or extend expiration limits.
                    </CardDescription>
                </CardHeader>
                <PollForm action={updateActionWithId} initialData={initialData} />
            </Card>
        </div>
    )
}