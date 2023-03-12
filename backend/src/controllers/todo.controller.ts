// Importing Libraries
import { Response, Request } from "express";
import expressAsyncHandler from "express-async-handler";

// Importing dependencies
import { Message } from "./../utils/helper";
import Api from "../utils/helper";
import { ITodo } from "../interfaces/todo";
import Todo from "../models/Todo";

const getTodos = expressAsyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		try {
			const todos: ITodo[] = await Todo.find();
			res.status(200).json({ todos });
			Api.ok(
				res,
				{
					todos,
				},
				"Todo fetched successfully!!!"
			);
		} catch (error) {
			return Api.serverError(req, res, error, Message.ServerError);
		}
	}
);

const addTodo = expressAsyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { name, description, completed } = req.body;

			const todo: ITodo = new Todo({
				name,
				description,
				completed,
			});

			const newTodo: ITodo = await todo.save();
			const allTodos: ITodo[] = await Todo.find();
			Api.created(res, { todo: newTodo, todos: allTodos }, "Todo added");
		} catch (error) {
			return Api.serverError(req, res, error, Message.ServerError);
		}
	}
);

const updateTodo = expressAsyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		try {
			const {
				params: { id },
				body,
			} = req;
			const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
				{ _id: id },
				body
			);
			const allTodos: ITodo[] = await Todo.find();
			Api.ok(res, { todo: updateTodo, todos: allTodos }, "Todo updated");
		} catch (error) {
			return Api.serverError(req, res, error, Message.ServerError);
		}
	}
);

const deleteTodo = expressAsyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		try {
			const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
				req.params.id
			);
			const allTodos: ITodo[] = await Todo.find();
			Api.ok(res, { todo: deletedTodo, todos: allTodos }, "Todo deleted");
		} catch (error) {
			return Api.serverError(req, res, error, Message.ServerError);
		}
	}
);

export { getTodos, addTodo, updateTodo, deleteTodo };
