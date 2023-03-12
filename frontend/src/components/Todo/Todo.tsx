import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/hook";
import {
	createTodo,
	deleteTodo,
	getTodos,
	updateTodo,
} from "../../redux/todo/slice";
import { Todo } from "../../types/todo";
import "./Todo.scss";

export const TodoList = () => {
	const dispatch = useAppDispatch();
	const todos = useSelector((state: any) => state.todos.todos);
	const [newTodo, setNewTodo] = useState<Todo>({
		id: "",
		title: "",
		description: "",
		completed: false,
	});

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodo({
			...newTodo,
			[event.target.name]: event.target.value,
		});
	};

	const handleTextareaChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setNewTodo({
			...newTodo,
			description: event.target.value,
		});
	};

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodo({
			...newTodo,
			completed: event.target.checked,
		});
	};

	const handleAddTodo = () => {
		dispatch(createTodo(newTodo));
		setNewTodo({
			id: "",
			title: "",
			description: "",
			completed: false,
		});
	};

	const handleEditTodo = (id: string, todo: Todo) => {
		dispatch(updateTodo(id, todo));
	};

	const handleDeleteTodo = (id: string) => {
		dispatch(deleteTodo(id));
	};

	const handleFetchTodos = () => {
		dispatch(getTodos());
	};

	return (
		<div>
			<h1>Todo List</h1>
			<button onClick={handleFetchTodos}>Fetch Todos</button>
			{todos.map((todo: any) => (
				<div key={todo.id}>
					<input
						type="text"
						name="title"
						value={todo.title}
						onChange={(e) =>
							handleEditTodo(todo.id, { ...todo, title: e.target.value })
						}
					/>
					<textarea
						name="description"
						value={todo.description}
						onChange={(e) =>
							handleEditTodo(todo.id, {
								...todo,
								description: e.target.value,
							})
						}></textarea>
					<input
						type="checkbox"
						name="completed"
						checked={todo.completed}
						onChange={(e) =>
							handleEditTodo(todo.id, {
								...todo,
								completed: e.target.checked,
							})
						}
					/>
					<button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
				</div>
			))}
			<div>
				<input
					type="text"
					name="title"
					value={newTodo.title}
					onChange={handleInputChange}
				/>
				<textarea
					name="description"
					value={newTodo.description}
					onChange={handleTextareaChange}></textarea>
				<input
					type="checkbox"
					name="completed"
					checked={newTodo.completed}
					onChange={handleCheckboxChange}
				/>
				<button onClick={handleAddTodo}>Add</button>
			</div>
		</div>
	);
};
