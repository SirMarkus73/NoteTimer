import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { orpc } from "#/orpc/client";

export const Route = createFileRoute("/")({ component: Home });

function useTodos() {
	return useQuery(orpc.listTodos.queryOptions({ input: {} }));
}

function useCreateTodo() {
	const queryClient = useQueryClient();
	return useMutation(
		orpc.addTodo.mutationOptions({
			onSuccess: () => queryClient.invalidateQueries({ queryKey: orpc.key() }),
		}),
	);
}

function Home() {
	const { data: todos } = useTodos();
	const { mutate: createTodo } = useCreateTodo();

	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold mb-4">Todo List</h1>
			<ul className="mb-4">
				{todos?.map((todo) => (
					<li key={todo.id} className="mb-2">
						<span className="text-sm text-gray-500 mr-2">#{todo.id}</span>
						{todo.name}
					</li>
				))}
			</ul>
			<button
				type="button"
				onClick={() => createTodo({ name: "New Todo" })}
				className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
			>
				Add Todo
			</button>
		</div>
	);
}
