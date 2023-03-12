import mongoose from "mongoose";
import { IUser } from "../interfaces/user";

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		otp: { type: String },
		otpExpiresAt: { type: Date },
	},
	{ timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
