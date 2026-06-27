import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "#/lib/auth.ts";
import { authClient } from "#/lib/auth-client";

export const getSession = createIsomorphicFn()
	.client(async () => {
		const { data, error } = await authClient.getSession();

		if (error) {
			console.error("Error fetching session:", error);
		}

		return data;
	})
	.server(async () => {
		const headers = getRequestHeaders();
		try {
			return await auth.api.getSession({
				headers,
			});
		} catch (error) {
			console.error("Error fetching session:", error);
		}
	});
