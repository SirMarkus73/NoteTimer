import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "#/db/schema/tasks";
import { orpc } from "#/orpc/client";

export function useDeleteTask() {
	const queryClient = useQueryClient();

	return useMutation(
		orpc.tasks.delete.mutationOptions({
			onSettled: () => {
				queryClient.invalidateQueries({
					queryKey: orpc.tasks.key(),
				});
			},
		}),
	);
}
