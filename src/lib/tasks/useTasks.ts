import { useQuery } from "@tanstack/react-query";
import { orpc } from "#/orpc/client";

type Params = {
	cursor?: number;
	limit?: number;
};

export function useTasks({ cursor, limit = 10 }: Params) {
	return useQuery(
		orpc.tasks.list.queryOptions({
			input: {
				cursor,
				limit,
			},
		}),
	);
}
