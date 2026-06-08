import { createFileRoute } from "@tanstack/react-router";
import { CreateTodoForm } from "#/components/todos/CreateTodoForm";
import { TodoList } from "#/components/todos/TodoList";
import { authClient } from "#/lib/auth-client";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	const { data: session, isPending } = authClient.useSession();

	return (
		<div className="p-8">
			<div className="grid grid-cols-2 gap-5 mb-8">
				<form
					className="flex flex-col gap-2 justify-between"
					onSubmit={async (e) => {
						e.preventDefault();
						const formData = new FormData(e.currentTarget);
						const email = formData.get("email") as string;
						const password = formData.get("password") as string;
						await authClient.signIn.email({ email, password });
						e.target.reset();
					}}
				>
					<legend>Login</legend>
					<input type="email" name="email" placeholder="Email" />
					<input type="password" name="password" placeholder="Password" />
					<button
						type="submit"
						className="bg-blue-500 text-white py-2 px-4 rounded"
					>
						Login
					</button>
				</form>
				<form
					className="flex flex-col gap-2 justify-between"
					onSubmit={async (e) => {
						e.preventDefault();
						const formData = new FormData(e.currentTarget);
						const name = formData.get("name") as string;
						const email = formData.get("email") as string;
						const password = formData.get("password") as string;
						await authClient.signUp.email({ name, email, password });
						e.target.reset();
					}}
				>
					<legend>Register</legend>
					<input type="text" name="name" placeholder="Name" />
					<input type="email" name="email" placeholder="Email" />
					<input type="password" name="password" placeholder="Password" />
					<button
						type="submit"
						className="bg-blue-500 text-white py-2 px-4 rounded"
					>
						Register
					</button>
				</form>
			</div>

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
		</div>
	);
}
