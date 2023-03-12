import React, { useState } from "react";
import "./Register.scss";
import { registerUser } from "../../../redux/auth/slice";
import { useAppDispatch } from "../../../hooks/hook";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useAppDispatch();

	const handleRegister = () => {
		const body = {
			username,
			email,
			password,
		};

		dispatch(registerUser(body));
	};

	return (
		<div className="register">
			<h1>Register</h1>
			<form onSubmit={(e) => e.preventDefault()}>
				<label>
					Username:
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<label>
					Email:
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<button type="submit" onClick={handleRegister}>
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
