import { Trash } from "lucide-react";
import { useDeleteTask } from "#/lib/tasks/useDeleteTask";
import { Button } from "../ui/button";

export function DeleteTaskBtn({ id }: { id: number }) {
	const { mutate } = useDeleteTask();

	return (
		<Button
			size="icon"
			variant="destructive"
			onClick={() => {
				mutate({ id });
			}}
		>
			<Trash />
		</Button>
	);
}
