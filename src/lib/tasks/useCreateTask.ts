import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orpc } from "#/orpc/client";

export function useCreateTask() {
	const queryClient = useQueryClient();

	return useMutation(
		orpc.tasks.create.mutationOptions({
			onSettled: () => {
				queryClient.invalidateQueries({ queryKey: orpc.tasks.key() });
			},
		}),
	);
}
