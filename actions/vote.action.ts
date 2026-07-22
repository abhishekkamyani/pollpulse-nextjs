"use server";

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { ApiPromise, CheckVoteResponse, IVote } from "@/lib/types";
import Poll from "@/models/Poll";
import Vote from "@/models/Vote";
import { revalidatePath } from "next/cache";

export const castVote = async (pollId: string, optionIndex: number): ApiPromise => {
    if (!pollId || !optionIndex.toString()) {
        return { success: false, error: "Required params are missing either pollId or optionIndex" };
    }

    try {
        const session = await auth();

        if (!session?.user?.id) {
            return { success: false, error: "You must be logged in to vote this poll." };
        }

        await connectDB();

        const isPollFound = await Poll.findById(pollId, "_id");

        if(!isPollFound?._id){
          return { success: false, error: "Poll not found." };
        }

        const vote = await Vote.create({
            pollId,
            optionIndex,
            userId: session?.user?.id
        })

        revalidatePath("/");
        // redirect(`/polls/${newPoll._id.toString()}`);
        return { success: true }
    } catch (error) {
        return { success: false, error: "Something went wrong. Please try again." };
    }
}

export const checkVote = async (
  pollId: string
): Promise<CheckVoteResponse> => {
  if (!pollId) {
    return { success: false, error: "Poll ID is required" };
  }

  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Please log in." };
    }

    await connectDB();

    // Passing <IVote> to findOne gives complete type safety on the lean output
    const vote = await Vote.findOne<IVote>({
      pollId,
      userId: session.user.id,
    }).lean();

    if (vote) {
      return {
        success: true,
        pollVote: {
          isVoted: true,
          optionIndex: vote.optionIndex,
        },
      };
    }

    return {
      success: true,
      pollVote: {
        isVoted: false,
        optionIndex: null,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
};