import type { SubmitEvent } from "react";
import { useCreateTask } from "#/lib/tasks/useCreateTask";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function CreateTaskForm() {
	const { mutate: createTask } = useCreateTask();

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const title = formData.get("name")?.toString().trim();

		if (title) {
			createTask({ title });
			e.currentTarget.reset();
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Input
				type="text"
				name="name"
				placeholder="New task"
				className="border p-2 rounded mr-2"
			/>
			<Button type="submit">Add Task </Button>
		</form>
	);
}
