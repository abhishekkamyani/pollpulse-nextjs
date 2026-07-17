import mongoose, { Schema, models, model, Document, Types } from "mongoose";

export interface IPoll extends Document{
  question: string;
  options: string[];
  createdBy: Types.ObjectId | string;
  createdAt: Date;
  expiresAt?: Date;
}

const PollSchema : Schema<IPoll>= new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
});

const Poll = models.Poll || model<IPoll>("Poll", PollSchema);
export default Poll;