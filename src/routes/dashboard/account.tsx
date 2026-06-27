import { createFileRoute } from "@tanstack/react-router";
import { MailIcon, UserIcon } from "lucide-react";
import { ChangePasswordBtn } from "#/components/account/changePasswordBtn";
import { LogoutBtn } from "#/components/account/logoutBtn";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Marker, MarkerContent, MarkerIcon } from "#/components/ui/marker";
import { authClient } from "#/lib/auth-client";

export const Route = createFileRoute("/dashboard/account")({
	component: Account,
});

function Account() {
	const { data: userSession } = authClient.useSession();

	const user = userSession?.user;

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Cuenta</CardTitle>
				<CardDescription>Gestión de tu cuenta</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-3">
				<Marker>
					<MarkerIcon>
						<UserIcon />
					</MarkerIcon>
					<MarkerContent>{user?.name}</MarkerContent>
				</Marker>
				<Marker>
					<MarkerIcon>
						<MailIcon />
					</MarkerIcon>
					<MarkerContent>{user?.email}</MarkerContent>
				</Marker>
			</CardContent>
			<CardFooter className="justify-end gap-2">
				<Button>Editar perfil</Button>
				<ChangePasswordBtn variant="secondary" />
				<LogoutBtn variant="destructive" />
			</CardFooter>
		</Card>
	);
}
