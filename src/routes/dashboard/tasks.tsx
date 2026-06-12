import { createFileRoute } from "@tanstack/react-router";
import { CreateTaskForm } from "#/components/tasks/createTaskForm";
import { TaskList } from "#/components/tasks/taskList";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";

export const Route = createFileRoute("/dashboard/tasks")({
	component: Tasks,
});

function Tasks() {
	return (
		<main className="min-h-screen grid place-items-center">
			<Card className="min-w-2/3">
				<CardHeader>
					<CardTitle>Gestión de Tareas</CardTitle>
					<CardDescription>
						Aquí podrás gestionar tus tareas, crear nuevas, editarlas o
						eliminarlas.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-5">
					<TaskList />
					<CreateTaskForm />
				</CardContent>
			</Card>
		</main>
	);
}
