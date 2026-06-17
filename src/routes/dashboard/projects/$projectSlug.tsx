import { createFileRoute, redirect } from "@tanstack/react-router";
import { authClient } from "#/lib/auth-client";

export const Route = createFileRoute("/dashboard/projects/$projectSlug")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const { projectSlug } = params;
		const { data: project, error } =
			await authClient.organization.getFullOrganization({
				query: {
					organizationSlug: projectSlug,
				},
			});

		if (error) {
			throw redirect({
				to: "/dashboard/projects",
			});
		}

		return {
			project,
		};
	},
});

function RouteComponent() {
	const { project } = Route.useLoaderData();

	return (
		<div>
			{project.name} - {project.slug}
		</div>
	);
}
