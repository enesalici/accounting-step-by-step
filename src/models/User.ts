import mongoose, { Schema, Document } from "mongoose";

export type IUser = Document & {
  firstname: string;
  lastname: string;
  email: string;
  createdAt: Date;
  passwordHash: string;
  passwordSalt: string;
};

const UserSchema = new Schema<IUser>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  createdAt: { type: Date, default: Date.now },
  passwordHash: { type: String, required: true },
  passwordSalt: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);


export default User;
