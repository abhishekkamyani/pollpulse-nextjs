"use server";

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { PollFormValues } from "@/lib/schemas";
import { ApiPromise, IPoll, IPollCreate } from "@/lib/types";
import Poll from "@/models/Poll";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPoll = async (data: PollFormValues) => {
    const session = await auth();

    if (!session?.user?.id) {
        return { error: "You must be logged in to create a poll." };
    }

    const { question, options, expiresAt } = data;
    const normalizedExpiresAt = expiresAt ? new Date(expiresAt) : undefined;

    console.log("expiresAt", normalizedExpiresAt)

    try {
        await connectDB();

        const newPoll = await Poll.create({
            question,
            options: options.map(o => o.value),
            expiresAt,
            createdBy: session.user.id,
            createdAt: new Date(),
        })

        revalidatePath("/");
        redirect(`/polls/${newPoll._id.toString()}`);
    } catch (error) {
        console.log("createPoll error:", error);
        return { error: "Something went wrong. Please try again." };
    }
}

export const getYourPolls = async () => {
    const session = await auth();

    if (!session?.user?.id) {
        return { error: "You must be logged in to create a poll." };
    }

    try {

        await connectDB();
        // const polls : IPoll[] = await Poll.find((poll: IPollCreate) => poll.createdBy === session?.user?.id).lean();
        const polls = await Poll.find({ createdBy: session.user.id })
            .populate("createdBy", "name email")
            .populate({ path: "votes", select: "optionIndex userId", options: { strictPopulate: false } })
            .lean<IPoll[]>();

        return { data: polls, status: 200 }

    } catch (error) {
        console.log("getYourPolls error:", error);
        return { error: "Something went wrong. Please try again." };
    }
}

export const deletePoll = async (id: string): ApiPromise => {
    if (!id) {
        return { error: "Poll Id is required", success: false }
    }

    try {
        await connectDB();

        const poll = await Poll.findByIdAndDelete(id);
        console.log(" deleting poll", poll)

        if (!poll) {
            return { error: "Poll not found", success: false }
        }

        revalidatePath("/");
        return { success: true }

    } catch (error) {
        return {
            success: false,
            error: "Unable to complete the deletion. Please try again later."
        };
    }
}