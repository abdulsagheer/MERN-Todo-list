// Importing Libraries
import { Router } from "express";

// Importing dependencies
import {
	getTodos,
	addTodo,
	updateTodo,
	deleteTodo,
} from "../controllers/todo.controller";
import { authMiddleware } from "../middleware/auth";

const todoRoute: Router = Router();

/** Get todos */
todoRoute.get("/todos", authMiddleware, getTodos);

/** Add todos */
todoRoute.post("/add-todo", authMiddleware, addTodo);

/** Edit todos */
todoRoute.put("/edit-todo/:id", authMiddleware, updateTodo);

/** Delete todos */
todoRoute.delete("/delete-todo/:id", authMiddleware, deleteTodo);

export default todoRoute;
