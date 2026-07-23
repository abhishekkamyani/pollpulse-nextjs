import { IVote } from "@/lib/types";
import { model, models, Schema } from "mongoose";

export const voteSchema = new Schema<IVote>(
  {
    // Removed `index: true` here since the compound index below covers it
    pollId: { type: Schema.Types.ObjectId, ref: "Poll", required: true },
    optionIndex: { type: Number, required: true, min: 0 },
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
  },
  {
    timestamps: true,
  }
);

voteSchema.index({ pollId: 1, optionIndex: 1 });

const Vote = models.Vote || model<IVote>("Vote", voteSchema);

export default Vote;