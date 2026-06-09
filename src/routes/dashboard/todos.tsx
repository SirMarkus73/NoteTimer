import { createFileRoute } from "@tanstack/react-router";
import { CreateTodoForm } from "#/components/todos/createTodoForm";
import { TodoList } from "#/components/todos/todoList";
import { authClient } from "#/lib/auth-client";

export const Route = createFileRoute("/dashboard/todos")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: session, isPending } = authClient.useSession();

	return (
		<main>
			<h1 className="text-2xl font-bold mb-4">Todo List</h1>
			{isPending ? (
				<p>Loading...</p>
			) : session ? (
				<p>Welcome, {session.user.name}!</p>
			) : (
				<p>Please log in to see your todos.</p>
			)}
			<TodoList />
			<CreateTodoForm />
		</main>
	);
}
