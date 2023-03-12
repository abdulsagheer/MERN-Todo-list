import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/Apis";

interface AuthState {
	token: string | null;
	error: string | null;
}

const initialState: AuthState = {
	token: localStorage.getItem("token") || null,
	error: null,
};

export const registerUser = createAsyncThunk(
	"auth/registerUser",
	async (body: any, thunkAPI) => {
		try {
			const response = await api.user.register(body);
			return response.token;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const loginUser = createAsyncThunk(
	"auth/loginUser",
	async (body: any, thunkAPI) => {
		try {
			const response = await api.user.login(body, { withCredentials: true });
			return response.token;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const verifyOTP = createAsyncThunk(
	"auth/verifyOTP",
	async (body: any, thunkAPI) => {
		try {
			const response = await api.user.verifyOTP(body);
			return response.token;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken(state, action: PayloadAction<string>) {
			state.token = action.payload;
			localStorage.setItem("token", action.payload);
		},
		clearToken(state) {
			state.token = null;
			localStorage.removeItem("token");
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.fulfilled, (state, action) => {
				state.token = action.payload;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.token = action.payload;
				state.error = null;
			})
			.addCase(verifyOTP.fulfilled, (state, action) => {
				state.token = action.payload;
				state.error = null;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.error = action.payload as string;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.error = action.payload as string;
			})
			.addCase(verifyOTP.rejected, (state, action) => {
				state.error = action.payload as string;
			});
	},
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
