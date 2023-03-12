import  { Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	otp: string;
	otpExpiresAt: Date;
	createdAt: Date;
	updatedAt: Date;
}
