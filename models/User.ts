import { model, models, Schema } from "mongoose";

export interface IUser extends Document {
    name: String;
    email: String;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
    {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},
  {
    timestamps: true, 
  }
);

const User = models.User || model<IUser>("User", UserSchema);

export default User;