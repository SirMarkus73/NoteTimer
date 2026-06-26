import { Plus } from "lucide-react";
import { type SubmitEvent, useState } from "react";
import z from "zod";
import { Button } from "#/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "#/components/ui/dialog";
import { authClient } from "#/lib/auth-client";
import { useAppForm } from "#/lib/forms/useAppForm";
import { checkSlugAvailability } from "#/lib/workspaces/checkSlugAvailability";
import { FieldGroup, FieldSet } from "../ui/field";

type Props = {
	className?: string;
};

const formSchema = z.object({
	name: z
		.string("El nombre del proyecto es requerido")
		.min(5, "El nombre del proyecto debe tener al menos 5 caracteres"),
	slug: z
		.string("El slug del proyecto es requerido")
		.min(3, "El slug del proyecto debe tener al menos 3 caracteres"),
});

const defaultValues: z.infer<typeof formSchema> = {
	name: "",
	slug: "",
};

export function CreateWorkspaceBtn({ className }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const form = useAppForm({
		defaultValues,
		validators: {
			onChange: formSchema,
		},
		onSubmit: ({ value }) => {
			authClient.organization.create({
				name: value.name,
				slug: value.slug,
			});
		},
	});

	const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		await form.handleSubmit();
		if (form.state.isValid) {
			setIsOpen(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger render={<Button className={className} />}>
				<Plus />
				Crear Proyecto
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Crear Proyecto</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
				<form id={form.formId} onSubmit={handleSubmit}>
					<FieldSet>
						<FieldGroup>
							<form.AppField name="name">
								{(field) => (
									<field.InputField
										label="Nombre del proyecto"
										autoComplete="off"
									/>
								)}
							</form.AppField>

							<form.AppField
								name="slug"
								validators={{
									onChangeAsyncDebounceMs: 750,
									onChangeAsync: async ({ value }) => {
										const { error } = await checkSlugAvailability(value);

										if (error) {
											return error.message;
										}
									},
								}}
							>
								{(field) => (
									<field.InputField
										label="Slug del proyecto"
										autoComplete="off"
									/>
								)}
							</form.AppField>
						</FieldGroup>
					</FieldSet>
				</form>
				<DialogFooter>
					<Button
						variant="secondary"
						size="sm"
						onClick={() => setIsOpen(false)}
					>
						Cancelar
					</Button>
					<form.AppForm>
						<form.SubmitButton label="Crear" />
					</form.AppForm>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
