import { StickyNote } from "lucide-react";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "#/components/ui/item";
import { Marker, MarkerContent, MarkerIcon } from "#/components/ui/marker";
import { Spinner } from "#/components/ui/spinner";
import { useTasks } from "#/lib/tasks/useTasks";
import { DeleteTaskBtn } from "./DeleteTaskBtn";

export function TaskList() {
	const { data: tasks, isLoading, isError, error } = useTasks({});

	if (isLoading) {
		return (
			<Marker>
				<MarkerIcon>
					<Spinner />
				</MarkerIcon>
				<MarkerContent>Cargando tareas</MarkerContent>
			</Marker>
		);
	}

	if (isError) {
		return (
			<div className="p-8 text-red-500">
				Error loading tasks. {error.message}
			</div>
		);
	}

	return (
		<ul className="grid gap-4">
			{tasks?.map((task) => (
				<Item key={task.id} className="min-w-48" variant="muted">
					<ItemMedia variant="icon">
						<StickyNote />
					</ItemMedia>
					<ItemContent>
						<ItemTitle>{task.title}</ItemTitle>
						<ItemDescription>
							Fecha de finalización planificada
							{task.plannedCompletionDate
								? `: ${task.plannedCompletionDate}${task.plannedCompletionTime ? ` - ${task.plannedCompletionTime}` : ""}`
								: ""}
						</ItemDescription>
					</ItemContent>
					<ItemActions>
						<DeleteTaskBtn id={task.id} />
					</ItemActions>
				</Item>
			))}
		</ul>
	);
}
