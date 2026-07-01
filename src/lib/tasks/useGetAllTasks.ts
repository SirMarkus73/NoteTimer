import { useQuery } from "@tanstack/react-query";
import { orpc } from "#/orpc/client";

export function useGetTasksByCompletionDate() {
	return useQuery(orpc.tasks.getByCompletionDate.queryOptions({ input: {} }));
}
