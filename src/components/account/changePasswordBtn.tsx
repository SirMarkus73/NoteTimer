import { type ComponentPropsWithoutRef, useState } from "react";
import { Button } from "#/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "#/components/ui/dialog";
import { ChangePasswordForm } from "./forms/changePasswordForm";

type Props = ComponentPropsWithoutRef<typeof Button>;

export function ChangePasswordBtn({ onClick, children, ...props }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger render={<Button {...props} />}>
				{children ?? "Cambiar contraseña"}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Cambiar contraseña</DialogTitle>
					<DialogDescription>
						Cambia tu contraseña para mantener tu cuenta segura. Asegúrate de
						elegir una contraseña fuerte y única que no hayas utilizado antes.
					</DialogDescription>
				</DialogHeader>

				<ChangePasswordForm
					onSuccess={() => setOpen(false)}
					onCancel={() => setOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	);
}
