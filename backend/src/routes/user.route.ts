// Importing Libraries
import { Router } from "express";

// Importing dependencies
import { signUp, login, verifyOTP } from "./../controllers/user.controller";

const userRoute: Router = Router();

/** Add Registration Details */
userRoute.post("/signup", signUp);

/** Add Login Details */
userRoute.post("/login", login);

/** Add OTP Details */
userRoute.post("/verify-OTP", verifyOTP);

export default userRoute;
