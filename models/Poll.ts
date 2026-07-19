import { IPoll } from "@/lib/types";
import { Schema, models, model } from "mongoose";
import "@/models/Vote";

const PollSchema = new Schema<IPoll>(
  {
    question: { type: String, required: true, trim: true },
    options: [{ type: String, required: true, trim: true }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    expiresAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

PollSchema.virtual("votes", {
  ref: "Vote",
  localField: "_id",
  foreignField: "pollId",
  justOne: false,
});

const Poll = models.Poll || model<IPoll>("Poll", PollSchema);
export default Poll;