import { useDeleteTodo } from "#/lib/todos/mutations";

export function DeleteTodoButton({ id }: { id?: number }) {
	const { mutate: deleteTodo } = useDeleteTodo();

	return (
		<button
			type="button"
			disabled={!id}
			onClick={() => id && deleteTodo({ id })}
			className="ml-4 text-red-500 hover:text-red-700 transition-colors"
		>
			Delete
		</button>
	);
}
