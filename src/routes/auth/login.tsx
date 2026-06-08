import { createFileRoute } from "@tanstack/react-router";
import { LoginCard } from "#/components/auth/loginCard";

export const Route = createFileRoute("/auth/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="grid min-h-screen place-items-center">
			<LoginCard className="min-w-2/4" />
		</main>
	);
}
