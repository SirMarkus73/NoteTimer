import { createFileRoute, redirect } from "@tanstack/react-router";
import { CreateTaskForm } from "#/components/tasks/createTaskForm";
import { TaskList } from "#/components/tasks/taskList";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { getFullOrganization } from "#/lib/organizations/getFullOrganization";
import { setActiveOrganization } from "#/lib/organizations/setActiveOrganization";

export const Route = createFileRoute("/dashboard/workspaces/$workspaceSlug")({
	component: RouteComponent,
	beforeLoad: async ({ params, preload }) => {
		if (preload) {
			return;
		}

		const { workspaceSlug } = params;

		const { error } = await setActiveOrganization(workspaceSlug);

		if (error) {
			throw redirect({
				to: "/dashboard",
			});
		}
	},
	loader: async ({ params }) => {
		const { workspaceSlug } = params;

		const { data: workspace, error } = await getFullOrganization(workspaceSlug);

		if (error || !workspace) {
			throw redirect({
				to: "/dashboard",
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
		<Card>
			<CardHeader>
				<CardTitle>
					{workspace.name} - {workspace.slug}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<TaskList />
			</CardContent>
			<CardFooter>
				<CreateTaskForm />
			</CardFooter>
		</Card>
	);
}
