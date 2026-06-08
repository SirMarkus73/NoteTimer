import { createFileRoute } from "@tanstack/react-router";
import { RegisterCard } from "#/components/auth/registerCard";

export const Route = createFileRoute("/auth/register")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="grid min-h-screen place-items-center">
			<RegisterCard className="min-w-2/4" />
		</main>
	);
}
