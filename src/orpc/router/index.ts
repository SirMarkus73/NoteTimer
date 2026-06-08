import { createTodo, deleteTodo, listTodos } from "./todos";

export default {
	todos: {
		list: listTodos,
		create: createTodo,
		delete: deleteTodo,
	},
};
