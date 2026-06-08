import { useQuery } from "@tanstack/react-query";
import { orpc } from "#/orpc/client";

export function useTodos() {
	return useQuery(orpc.todos.list.queryOptions({ input: {} }));
}
