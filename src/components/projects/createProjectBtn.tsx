import { useForm } from "@tanstack/react-form";
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
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

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

export function CreateProjectBtn({ className }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm({
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
				<form id="create-project-form" onSubmit={handleSubmit}>
					<FieldSet>
						<FieldGroup>
							{
								<form.Subscribe>
									{({ isSubmitting }) => (
										<>
											<form.Field name="name">
												{(field) => (
													<Field>
														<FieldLabel htmlFor={field.name}>
															Nombre del proyecto
														</FieldLabel>
														<Input
															name={field.name}
															id={field.name}
															onChange={(e) =>
																field.handleChange(e.target.value)
															}
															onBlur={field.handleBlur}
															disabled={isSubmitting}
														/>
														{field.state.meta.errors?.[0]?.message && (
															<FieldError>
																{field.state.meta.errors[0].message}
															</FieldError>
														)}
													</Field>
												)}
											</form.Field>
											<form.Field
												name="slug"
												validators={{
													onChangeAsyncDebounceMs: 750,
													onChangeAsync: async ({ value }) => {
														const response =
															await authClient.organization.checkSlug({
																slug: value,
															});

														if (response.error) {
															switch (response.error.code) {
																case "ORGANIZATION_SLUG_ALREADY_TAKEN": {
																	return "El slug ya está en uso. Por favor, elige otro.";
																}
																default: {
																	return "Error desconocido al verificar el slug. Por favor, inténtalo de nuevo.";
																}
															}
														}
													},
												}}
											>
												{(field) => (
													<Field>
														<FieldLabel htmlFor={field.name}>
															Slug del proyecto
														</FieldLabel>
														<Input
															name={field.name}
															id={field.name}
															onChange={(e) =>
																field.handleChange(e.target.value)
															}
															onBlur={field.handleBlur}
															disabled={isSubmitting}
														/>

														{field.state.meta.errors.length > 0 && (
															<FieldError>
																{typeof field.state.meta.errors[0] === "string"
																	? field.state.meta.errors[0]
																	: field.state.meta.errors[0]?.message}
															</FieldError>
														)}
													</Field>
												)}
											</form.Field>
										</>
									)}
								</form.Subscribe>
							}
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
					<form.Subscribe>
						{({ isSubmitting }) => (
							<Button
								variant="default"
								size="sm"
								form="create-project-form"
								type="submit"
							>
								{isSubmitting && <Spinner data-icon="inline-start" />}
								Crear
							</Button>
						)}
					</form.Subscribe>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
