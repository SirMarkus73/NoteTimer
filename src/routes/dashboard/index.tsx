import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { CreateWorkspaceBtn } from "#/components/workspaces/createWorkspaceBtn";
import { authClient } from "#/lib/auth-client";

export const Route = createFileRoute("/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: projects } = authClient.useListOrganizations();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Gestión de Espacios de Trabajo</CardTitle>
				<CardDescription>
					Aquí podrás gestionar tus espacios de trabajo, crear nuevos, editarlos
					o eliminarlos.
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-5">
				<CreateWorkspaceBtn />
				{projects && projects.length > 0 ? (
					<ul>
						{projects.map((project) => (
							<li key={project.id}>
								<Link
									to="/dashboard/workspaces/$workspaceSlug"
									params={{ workspaceSlug: project.slug }}
								>
									{project.name} - <small>{project.slug}</small>
								</Link>
							</li>
						))}
					</ul>
				) : (
					<p>
						No tienes proyectos aún. Crea uno para empezar a organizar tus
						tareas.
					</p>
				)}
			</CardContent>
		</Card>
	);
}
