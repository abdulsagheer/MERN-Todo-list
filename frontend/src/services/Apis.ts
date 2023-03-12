import { AxiosRequest } from "./ApiCall";

const baseUrl = import.meta.env.VITE_SERVER_URL as string;
console.log(import.meta.env.VITE_SERVER_URL);

export const api = {
	user: {
		register: async (body: any) => {
			const { data } = await AxiosRequest(
				"POST",
				`${baseUrl}/user/signup`,
				body
			);
			return data;
		},
		login: async (body: any, header: any) => {
			const { data } = await AxiosRequest(
				"POST",
				`${baseUrl}/user/login`,
				body,
				header
			);
			return data;
		},
		verifyOTP: async (body: any) => {
			const { data } = await AxiosRequest(
				"POST",
				`${baseUrl}/user/verify-OTP`,
				body
			);
			return data;
		},
	},
	todo: {
		getTodos: async () => {
			const { data } = await AxiosRequest("GET", `${baseUrl}/todo/todos`);
			return data;
		},
		createTodo: async (body: any) => {
			const { data } = await AxiosRequest(
				"POST",
				`${baseUrl}/todo/add-todo`,
				body
			);
			return data;
		},
		updateTodo: async (id: string, body: any) => {
			const { data } = await AxiosRequest(
				"PUT",
				`${baseUrl}/edit-todo/${id}`,
				body
			);
			return data;
		},
		deleteTodo: async (id: string) => {
			const { data } = await AxiosRequest(
				"DELETE",
				`${baseUrl}/delete-todo/${id}`
			);
			return data;
		},
	},
};
