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

// Ensure a user can only vote once per poll. Use a partial unique index
// so anonymous votes (missing `userId`) are allowed while authenticated
// users are constrained to a single vote per poll.
voteSchema.index(
  { pollId: 1, userId: 1 },
  { unique: true, partialFilterExpression: { userId: { $exists: true } } }
);
const Vote = models.Vote || model<IVote>("Vote", voteSchema);

export default Vote;