import {
	createTask,
	deleteTask,
	getTask,
	listTasks,
	updateTask,
} from "./tasks";
import { createTodo, deleteTodo, listTodos } from "./todos";

export default {
	todos: {
		list: listTodos,
		create: createTodo,
		delete: deleteTodo,
	},
	tasks: {
		create: createTask,
		list: listTasks,
		get: getTask,
		update: updateTask,
		delete: deleteTask,
	},
};
