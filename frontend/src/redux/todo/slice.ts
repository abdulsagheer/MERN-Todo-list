import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/Apis";

interface Todo {
	id: string;
	title: string;
	description: string;
	completed: boolean;
}

interface TodosState {
	todos: Todo[];
}

const initialState: TodosState = {
	todos: [],
};

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
	const todos = await api.todo.getTodos();
	return todos;
});

export const createTodo = createAsyncThunk(
	"todos/createTodo",
	async (todo: Todo) => {
		const newTodo = await api.todo.createTodo(todo);
		return newTodo;
	}
);

export const updateTodo = createAsyncThunk(
	"todos/updateTodo",
	async (id: string, todo: any) => {
		const updatedTodo = await api.todo.updateTodo(id, todo);
		return updatedTodo;
	}
);

export const deleteTodo = createAsyncThunk(
	"todos/deleteTodo",
	async (id: string) => {
		const deletedTodo = await api.todo.deleteTodo(id);
		return deletedTodo;
	}
);

const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTodos.fulfilled, (state, action) => {
				state.todos = action.payload;
			})
			.addCase(createTodo.fulfilled, (state, action) => {
				state.todos.push(action.payload);
			})
			.addCase(updateTodo.fulfilled, (state, action) => {
				const index = state.todos.findIndex(
					(todo) => todo.id === action.payload.id
				);
				if (index !== -1) {
					state.todos[index] = { ...state.todos[index], ...action.payload };
				}
			})
			.addCase(deleteTodo.fulfilled, (state, action) => {
				state.todos = state.todos.filter(
					(todo) => todo.id !== action.payload.id
				);
			});
	},
});

export default todosSlice.reducer;
