import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "#/db/schema";
import { orpc } from "#/orpc/client";

export function useCreateTodo() {
	const queryClient = useQueryClient();
	const listTodosQueryKey = orpc.todos.list.queryKey({ input: {} });
	const todosQueryKey = orpc.todos.key();

	return useMutation(
		orpc.todos.create.mutationOptions({
			onMutate: async (newTodo) => {
				await queryClient.cancelQueries({ queryKey: listTodosQueryKey });

				const previousTodos = queryClient.getQueryData(listTodosQueryKey);
				const predictedNextId = previousTodos
					? Math.max(...previousTodos.map((t) => t.id)) + 1
					: 1;
				const optimisticTodo: Todo = {
					id: predictedNextId,
					title: newTodo.name,
					createdAt: new Date(),
				};

				if (previousTodos) {
					queryClient.setQueryData(listTodosQueryKey, [
						...previousTodos,
						optimisticTodo,
					]);
				} else {
					queryClient.setQueryData(listTodosQueryKey, [optimisticTodo]);
				}
			},
			onSettled: () => {
				queryClient.invalidateQueries({ queryKey: todosQueryKey });
			},
		}),
	);
}

export function useDeleteTodo() {
	const queryClient = useQueryClient();
	const listTodosQueryKey = orpc.todos.list.queryKey({ input: {} });

	return useMutation(
		orpc.todos.delete.mutationOptions({
			onMutate: ({ id }) => {
				queryClient.cancelQueries({
					queryKey: listTodosQueryKey,
				});

				const previousTodos = queryClient.getQueryData(listTodosQueryKey);

				if (previousTodos) {
					queryClient.setQueryData(
						listTodosQueryKey,
						previousTodos.filter((todo) => todo.id !== id),
					);
				}
			},
			onSettled: () =>
				queryClient.invalidateQueries({ queryKey: orpc.todos.key() }),
		}),
	);
}
