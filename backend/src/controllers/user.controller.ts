// Importing Libraries
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";

// Importing dependencies
import { IUser } from "../interfaces/user";
import User from "../models/User";
import { Message } from "./../utils/helper";
import Api from "../utils/helper";

// Sign up a new user
export const signUp = expressAsyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { name, email, password } = req.body;

			// Check if user already exists
			const existingUser = await User.findOne({ email });
			if (existingUser) {
				return Api.badRequest(res, " ", Message.UserExist);
			}

			// Hash the password
			const hashedPassword = await bcrypt.hashSync(password);

			// Create a new user
			const user: IUser = new User({
				name,
				email,
				password: hashedPassword,
			});

			// Save the user to the database
			const savedUser = await user.save();

			// Generate and send OTP
			const otp = otpGenerator.generate(6, {
				digits: true,
				alphabets: false,
				upperCase: false,
				specialChars: false,
			});
			const otpExpiresAt = new Date(new Date().getTime() + 5 * 60 * 1000);
			savedUser.otp = otp;
			savedUser.otpExpiresAt = otpExpiresAt;
			await savedUser.save();

			// Send OTP via email
			const transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					user: process.env.EMAIL_USERNAME,
					pass: process.env.EMAIL_PASSWORD,
				},
			});
			const mailOptions = {
				from: process.env.EMAIL_USERNAME,
				to: email,
				subject: "OTP for Todo App Login",
				text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
			};
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error);
				} else {
					console.log("Email sent: " + info.response);
				}
			});

			Api.created(res, user, Message.CreateAccount);
		} catch (error) {
			console.error(error);
			return Api.serverError(req, res, error, Message.ServerError);
		}
	}
);

// Login an existing user
export const login = expressAsyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { email, password } = req.body;

			// Check if user exists
			const user = await User.findOne({ email });
			if (!user) {
				return Api.unauthorized(
					res,
					"Invalid Login Credentials",
					Message.ValidationError
				);
			}

			// Check if password is correct
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return Api.unauthorized(
					res,
					"Invalid Login Credentials",
					Message.ValidationError
				);
			}

			// Check if OTP is valid and not expired
			if (!user.otp || user.otpExpiresAt < new Date()) {
				return Api.unauthorized(
					res,
					"OTP expired or not provided",
					Message.ValidationError
				);
			}

			// Verify OTP
			const { otp } = req.body;
			if (otp !== user.otp) {
				return Api.unauthorized(res, "Invalid OTP", Message.ValidationError);
			}

			// Generate JWT token
			const token = jwt.sign(
				{ id: user._id },
				process.env.JWT_SECRET as string
			);

			res.status(200).json({ token });
		} catch (error) {
			console.error(error);
			return Api.serverError(req, res, error, Message.ServerError);
		}
	}
);

// Verify OTP
export const verifyOTP = expressAsyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { email, otp } = req.body;

			// Check if user exists
			const user = await User.findOne({ email });
			if (!user) {
				Api.badRequest(res, "User not found", Message.UserNotFound);
			}

			// Check if OTP is valid and not expired
			if (!user?.otp || user?.otpExpiresAt < new Date()) {
				return Api.unauthorized(
					res,
					"OTP expired or not provided",
					Message.ValidationError
				);
			}

			// Verify OTP
			if (otp !== user.otp) {
				return Api.unauthorized(res, "Invalid OTP", Message.ValidationError);
			}

			// Clear OTP
			user.otp = "";
			user.otpExpiresAt = new Date("0000-03-12T12:00:00");
			await user.save();
			res.status(200).json({ message: "OTP verified successfully" });
		} catch (error) {
			console.error(error);
			return Api.serverError(req, res, error, Message.ServerError);
		}
	}
);
