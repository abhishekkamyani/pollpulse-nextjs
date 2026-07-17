"use server";

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { PollFormValues } from "@/lib/schemas";
import Poll from "@/models/Poll";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPoll = async (data: PollFormValues) => {
    const session = await auth();

    if (!session?.user?.id) {
        return { error: "You must be logged in to create a poll." };
    }

    const { question, options, expiresAt } = data;

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
        console.error("createPoll error:", error);
        return { error: "Something went wrong. Please try again." };
    }
}