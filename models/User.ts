import { IUser } from "@/lib/types";
import { model, models, Schema } from "mongoose";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<IUser>("User", UserSchema);

export default User;