import React, { useState } from "react";
import { verifyOTP } from "../../../redux/auth/slice";
import { useAppDispatch } from "../../../hooks/hook";
import "./VerifyOTP.scss";

const VerifyOTP = () => {
	const dispatch = useAppDispatch();
	const [otp, setOTP] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (otp.trim() === "") {
			setError("Please enter the OTP.");
			return;
		}
		try {
			await dispatch(verifyOTP({ otp }));
			setError("");
			setOTP("");
		} catch (error: any) {
			setError(error.message);
		}
	};

	return (
		<div className="verify-otp-container">
			<form onSubmit={handleSubmit}>
				<h2>Verify OTP</h2>
				<div className="form-control">
					<label htmlFor="otp">OTP:</label>
					<input
						type="text"
						id="otp"
						name="otp"
						value={otp}
						onChange={(event) => setOTP(event.target.value)}
					/>
				</div>
				{error && <div className="error">{error}</div>}
				<button type="submit">Verify</button>
			</form>
		</div>
	);
};

export default VerifyOTP;
