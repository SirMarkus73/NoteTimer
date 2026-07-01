import {
	createTask,
	deleteTask,
	getTask,
	getTasksByCompletionDate,
	listTasks,
	updateTask,
} from "./tasks";

export default {
	tasks: {
		create: createTask,
		list: listTasks,
		get: getTask,
		update: updateTask,
		delete: deleteTask,
		getByCompletionDate: getTasksByCompletionDate,
	},
};
