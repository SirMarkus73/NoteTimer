import type { SubmitEvent } from "react";
import { useCreateTodo } from "#/lib/todos/mutations";

export function CreateTodoForm() {
	const { mutate: createTodo } = useCreateTodo();

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const title = formData.get("name")?.toString().trim();

		if (title) {
			createTodo({ name: title });
			e.currentTarget.reset();
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="name"
				placeholder="New todo"
				className="border p-2 rounded mr-2"
			/>
			<button
				type="submit"
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
			>
				Add Todo
			</button>
		</form>
	);
}
