import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "#/lib/auth.ts";
import { authClient } from "#/lib/auth-client";

export const getFullOrganization = createIsomorphicFn()
	.client(async (organizationSlug: string) => {
		const { data, error } = await authClient.organization.getFullOrganization({
			query: {
				organizationSlug,
			},
		});

		return { data, error };
	})
	.server(async (organizationSlug: string) => {
		const headers = getRequestHeaders();

		try {
			const data = await auth.api.getFullOrganization({
				headers,
				query: {
					organizationSlug,
				},
			});

			return { data, error: null };
		} catch (error) {
			console.error("Error fetching full organization:", error);
			return { data: null, error };
		}
	});
