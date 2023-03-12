import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import VerifyOTP from "./components/Auth/VerifyOTP/VerifyOTP";
import { TodoList } from "./components/Todo/Todo";
import "./styles/App.scss";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/todo" element={<TodoList />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/verifyotp" element={<VerifyOTP />} />
			</Routes>
		</div>
	);
}

export default App;
