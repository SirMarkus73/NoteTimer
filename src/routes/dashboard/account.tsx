import { createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { authClient } from "#/lib/auth-client";

export const Route = createFileRoute("/dashboard/account")({
	component: Account,
});

function Account() {
	const { data: session } = authClient.useSession();

	return (
		<main className="min-h-screen grid place-items-center">
			<Card>
				<CardHeader>
					<CardTitle>Cuenta</CardTitle>
					<CardDescription>Gestión de tu cuenta</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Aquí podrás gestionar tu cuenta, cambiar tu contraseña, etc.</p>

					<h3>
						Tu token de acceso es: <code>{session?.session.token}</code>
					</h3>
				</CardContent>
			</Card>
		</main>
	);
}
