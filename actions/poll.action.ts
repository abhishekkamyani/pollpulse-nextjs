"use server";

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { ApiPromise, CreatePollResponse, IPoll, PollFormValues } from "@/lib/types";
import Poll from "@/models/Poll";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPoll = async (data: PollFormValues): CreatePollResponse => {
    const session = await auth();

    if (!session?.user?.id) {
        return { success: false, error: "You must be logged in to create a poll." };
    }

    const { question, options, expiresAt } = data;

    try {
        await connectDB();

        const newPoll = await Poll.create({
            question,
            options: options.map(o => o.value),
            expiresAt: expiresAt ? new Date(expiresAt) : undefined,
            createdBy: session.user.id,
            createdAt: new Date(),
        })

        revalidatePath("/");
        return { success: true, id: newPoll._id.toString() };
        // redirect(`/polls/${newPoll._id.toString()}`);
    } catch (error) {
        if (typeof error === "object" && error !== null && "digest" in error && typeof (error as { digest?: string }).digest === "string" && (error as { digest?: string }).digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        console.log("createPoll error:", error);
        return { success: false, error: "Something went wrong. Please try again." };
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

/**
 * Action 1: Get a poll by ID ONLY if it belongs to the logged-in user
 */
export const getUserPollById = async (id: string) => {
    if (!id) {
        return { success: false, error: "Poll ID is required" };
    }

    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        await connectDB();

        // Query for the poll matching both the poll ID AND the current user's ID
        const poll = await Poll.findOne({
            _id: id,
            createdBy: session.user.id,
        }).lean();

        if (!poll) {
            return { success: false, error: "Poll not found or access denied" };
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(poll)),
        };
    } catch (error) {
        if (
            typeof error === "object" &&
            error !== null &&
            "digest" in error &&
            typeof (error as { digest?: string }).digest === "string" &&
            (error as { digest?: string }).digest?.startsWith("NEXT_REDIRECT")
        ) {
            throw error;
        }

        return {
            success: false,
            error: "Unable to fetch your poll. Please try again later.",
        };
    }
};

/**
 * Action: Get ANY poll by ID with populated author details (name and email)
 */
export const getPollById = async (id: string) => {
    if (!id) {
        return { success: false, error: "Poll ID is required" };
    }

    try {
        await connectDB();

        const poll = await Poll.findById(id)
            .populate("createdBy", "name")
            .lean();

        if (!poll) {
            return { success: false, error: "Poll not found" };
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(poll)),
        };
    } catch (error) {
        if (
            typeof error === "object" &&
            error !== null &&
            "digest" in error &&
            typeof (error as { digest?: string }).digest === "string" &&
            (error as { digest?: string }).digest?.startsWith("NEXT_REDIRECT")
        ) {
            throw error;
        }

        return {
            success: false,
            error: "Unable to fetch poll details. Please try again later.",
        };
    }
};

export const getPolls = async () => {
    const session = await auth();

    try {
        await connectDB();

        const polls = await Poll.find({ createdBy: { $ne: session?.user?.id } })
            .populate("createdBy", "name email")
            .populate({ path: "votes", select: "optionIndex userId", options: { strictPopulate: false } })
            .lean();

        return { data: polls, status: 200 };
    } catch (error) {
        console.error("Error fetching polls:", error);
        return { error: "Something went wrong. Please try again." };
    }
};

export const updatePoll = async (id: string, data: PollFormValues) => {
    const session = await auth();

    if (!session?.user?.id) {
        return { success: false, error: "You must be logged in to update a poll." };
    }

    if (!id) {
        return { error: "Poll Id is required", success: false };
    }

    try {
        await connectDB();

        // 1. Fetch the poll first to inspect who created it
        const existingPoll = await Poll.findById(id);
        if (!existingPoll) {
            return { error: "Poll not found", success: false };
        }

        // 2. Authorization check: compare current user ID with createdBy
        if (existingPoll.createdBy.toString() !== session.user.id) {
            return { error: "Unauthorized: You did not create this poll", success: false };
        }

        const { question, options, expiresAt } = data;

        // 3. Modify the properties directly on the existing document instance
        existingPoll.question = question;
        existingPoll.options = options.map(option => option.value);
        existingPoll.expiresAt = expiresAt ? new Date(expiresAt) : undefined;
        // Notice we don't touch 'existingPoll.createdBy', so it stays intact!

        // 4. Persist the changes directly to MongoDB
        await existingPoll.save();

        revalidatePath("/dashboard");
        revalidatePath(`/polls/${id}`);
        redirect(`/polls/${id}`);

    } catch (error) {
        if (typeof error === "object" && error !== null && "digest" in error && typeof (error as { digest?: string }).digest === "string" && (error as { digest?: string }).digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        console.error("Database update error:", error);
        return {
            success: false,
            error: "Unable to complete the modifications. Please try again later."
        };
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
        // revalidatePath("/dashboard");
        return { success: true }

    } catch (error) {
        return {
            success: false,
            error: "Unable to complete the deletion. Please try again later."
        };
    }
}