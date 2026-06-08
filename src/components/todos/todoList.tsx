import { useTodos } from "#/lib/todos/query";
import { DeleteTodoButton } from "./deleteTodoButton";

export function TodoList() {
	const { data: todos, isLoading, isError } = useTodos();

	if (isLoading) {
		return <div className="p-8">Loading...</div>;
	}

	if (isError) {
		return <div className="p-8 text-red-500">Error loading todos.</div>;
	}

	return (
		<ul className="p-8">
			{todos?.map((todo) => (
				<li key={todo.id} className="mb-2">
					<span className="text-sm text-gray-500 mr-2">#{todo.id}</span>
					{todo.title}
					<DeleteTodoButton id={todo.id} />
				</li>
			))}
		</ul>
	);
}
