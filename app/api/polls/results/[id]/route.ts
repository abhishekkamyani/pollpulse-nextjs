import { connectDB } from "@/lib/db";
import { GetPollResultsResponse } from "@/lib/types";
import Poll from "@/models/Poll";
import Vote from "@/models/Vote";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
    params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
    const { id } = await params;
    if (!id) {
        return NextResponse.json({ error: "Poll Id is required", success: false });
    }

    try {
        await connectDB();

        const poll = await Poll.findById(id).lean();
        if (!poll) {
            return NextResponse.json({ success: false, error: "Poll not found" });
        }

        const votes = await Vote.find({ pollId: id }).select("optionIndex").lean();
        const voteCounts = votes.reduce<Record<number, number>>((acc, vote) => {
            const index = vote.optionIndex ?? 0;
            acc[index] = (acc[index] ?? 0) + 1;
            return acc;
        }, {});

        const formattedOptions = poll.options.map((label: string, optionIndex: number) => ({
            label,
            index: optionIndex,
            voteCount: voteCounts[optionIndex] ?? 0,
        }));

        return NextResponse.json({
            success: true,
            data: {
                ...poll,
                options: formattedOptions,
            },
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: "Unable to get the poll results. Please try again later."
        });
    }
}