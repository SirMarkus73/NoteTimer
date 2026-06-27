import { useNavigate } from "@tanstack/react-router";
import { type ComponentPropsWithoutRef, useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "#/components/ui/alert-dialog";
import { Button } from "#/components/ui/button";
import { authClient } from "#/lib/auth-client";

type Props = ComponentPropsWithoutRef<typeof Button>;

export function LogoutBtn({ onClick, children, ...props }: Props) {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger render={<Button {...props} />}>
				{children ?? "Cerrar sesión"}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Seguro que quieres cerrar sesión?</AlertDialogTitle>
					<AlertDialogDescription>
						Una vez que cierres sesión, tendrás que iniciar sesión nuevamente
						para acceder a tu cuenta.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						{...props}
						onClick={(e) => {
							onClick?.(e);
							authClient.signOut();
							setOpen(false);
							navigate({ to: "/" });
						}}
					>
						{children ?? "Cerrar sesión"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
