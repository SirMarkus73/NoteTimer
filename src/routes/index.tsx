import { createFileRoute } from "@tanstack/react-router";
import { CreateTodoForm } from "#/components/todos/CreateTodoForm";
import { TodoList } from "#/components/todos/TodoList";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold mb-4">Todo List</h1>
			<TodoList />
			<CreateTodoForm />
		</div>
	);
}
