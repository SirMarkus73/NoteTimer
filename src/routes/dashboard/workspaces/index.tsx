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

export const Route = createFileRoute("/dashboard/workspaces/")({
	component: Projects,
});

function Projects() {
	const { data: projects } = authClient.useListOrganizations();

	return (
		<main className="min-h-screen grid place-items-center">
			<Card className="min-w-2/3">
				<CardHeader>
					<CardTitle>Gestión de Espacios de Trabajo</CardTitle>
					<CardDescription>
						Aquí podrás gestionar tus espacios de trabajo, crear nuevos,
						editarlos o eliminarlos.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-5">
					<CreateWorkspaceBtn className="w-1/4" />
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
		</main>
	);
}
