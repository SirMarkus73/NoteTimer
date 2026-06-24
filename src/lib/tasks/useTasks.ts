import { useQuery } from "@tanstack/react-query";
import { orpc } from "#/orpc/client";
import { authClient } from "../auth-client";

type Params = {
	cursor?: number;
	limit?: number;
};

export function useTasks({ cursor, limit = 10 }: Params) {
	const { data, isPending } = authClient.useActiveOrganization();

	return useQuery(
		orpc.tasks.list.queryOptions({
			input: {
				cursor,
				limit,
			},
			queryKey: [
				...orpc.tasks.list.key({ input: { cursor, limit } }),
				{ organizationId: data?.id },
			],
			staleTime: 1000 * 60 * 5, // 5 minutes
			enabled: !isPending && !!data?.id,
		}),
	);
}
