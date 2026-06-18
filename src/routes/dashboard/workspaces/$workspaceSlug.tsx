import { createFileRoute, redirect } from "@tanstack/react-router";
import { authClient } from "#/lib/auth-client";

export const Route = createFileRoute("/dashboard/workspaces/$workspaceSlug")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const { workspaceSlug } = params;
		const { data: workspace, error } =
			await authClient.organization.getFullOrganization({
				query: {
					organizationSlug: workspaceSlug,
				},
			});

		if (error) {
			throw redirect({
				to: "/dashboard/workspaces",
			});
		}

		return {
			workspace,
		};
	},
});

function RouteComponent() {
	const { workspace } = Route.useLoaderData();

	return (
		<div>
			{workspace.name} - {workspace.slug}
		</div>
	);
}
