import React, { useState } from "react";
import { useAppDispatch } from "../../../hooks/hook";
import { loginUser } from "../../../redux/auth/slice";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useAppDispatch();

	const handleLogin = () => {
		const body = {
			email,
			password,
		};

		dispatch(loginUser(body));
	};

	return (
		<div className="login-container">
			<h1>Login</h1>
			<form onSubmit={(e) => e.preventDefault()}>
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
				<button type="submit" onClick={handleLogin}>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
