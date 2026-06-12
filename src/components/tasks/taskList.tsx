import { StickyNote } from "lucide-react";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "#/components/ui/item";
import { useTasks } from "#/lib/tasks/useTasks";
import { DeleteTaskBtn } from "./DeleteTaskBtn";

export function TaskList() {
	const { data: tasks, isLoading, isError } = useTasks({});

	if (isLoading) {
		return <div className="p-8">Loading...</div>;
	}

	if (isError) {
		return <div className="p-8 text-red-500">Error loading tasks.</div>;
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
							Planned Completion:{" "}
							{task.plannedCompletion
								? task.plannedCompletion.toLocaleDateString()
								: "N/A"}
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
