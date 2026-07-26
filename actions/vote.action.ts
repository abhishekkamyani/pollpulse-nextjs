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

    const isPollFound = await Poll.findById(pollId, "_id expiresAt createdBy");

    if (!isPollFound?._id) {
      return { success: false, error: "Poll not found." };
    }

    const isCreator = session?.user?.id === isPollFound?.createdBy;
    const alreadyVoted = await Vote.findOne<IVote>({ pollId: isPollFound._id, userId: session.user.id }).lean();
    const isExpired = isPollFound.expiresAt && new Date(isPollFound.expiresAt) < new Date();

    const isLocked = isCreator || Boolean(alreadyVoted?._id) || isExpired;

    if (isLocked) {
      return { success: false, error: "Something went wrong. Please try again." };
    }


    try {
      await Vote.create({
        pollId,
        optionIndex,
        userId: session?.user?.id,
      })
    } catch (err: any) {
      // Handle duplicate key (race condition where two requests create the same vote)
      // Mongo duplicate key error code is 11000 (E11000). Return deterministic message.
      if (err && (err.code === 11000 || String(err.message).includes("E11000"))) {
        return { success: false, error: "You already voted on this poll." };
      }
      throw err
    }

    revalidatePath("/");
    return { success: true }
  } catch (error) {
    console.log("Vote Cast error:", error);
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
      return {
        success: true, pollVote: {
          isVoted: false,
          optionIndex: null,
        },
      };
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