import { IVote } from "@/lib/types";
import { model, models, Schema } from "mongoose";

export const voteSchema = new Schema<IVote>(
  {
    pollId: { type: Schema.Types.ObjectId, ref: "Poll", required: true, index: true },
    optionIndex: { type: Number, required: true, min: 0 },
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
  },
  {
    timestamps: true,
  }
);

const Vote = models.Vote || model<IVote>("Vote", voteSchema);

export default Vote;