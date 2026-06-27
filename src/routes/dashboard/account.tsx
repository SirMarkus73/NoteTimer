import { createFileRoute } from "@tanstack/react-router";
import { MailIcon, UserIcon } from "lucide-react";
import { ChangePasswordBtn } from "#/components/account/changePasswordBtn";
import { LogoutBtn } from "#/components/account/logoutBtn";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Marker, MarkerContent, MarkerIcon } from "#/components/ui/marker";
import { Skeleton } from "#/components/ui/skeleton";
import { authClient } from "#/lib/auth-client";

export const Route = createFileRoute("/dashboard/account")({
	component: Account,
});

function Account() {
	const { data: userSession, isPending } = authClient.useSession();
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
					<MarkerContent>
						{isPending ? <Skeleton className="h-4 w-32" /> : user?.name}
					</MarkerContent>
				</Marker>
				<Marker>
					<MarkerIcon>
						<MailIcon />
					</MarkerIcon>
					<MarkerContent>
						{isPending ? <Skeleton className="h-4 w-32" /> : user?.email}
					</MarkerContent>
				</Marker>
			</CardContent>
			<CardFooter className="justify-end gap-2">
				<ChangePasswordBtn disabled={isPending} variant="secondary" />
				<LogoutBtn disabled={isPending} variant="destructive" />
			</CardFooter>
		</Card>
	);
}
