import { Link, useNavigate } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import z from "zod";
import { buttonVariants } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { FieldDescription, FieldGroup, FieldSet } from "#/components/ui/field";
import { authClient } from "#/lib/auth-client";
import { useAppForm } from "#/lib/forms/useAppForm";

type Props = {
	className?: string;
};

const formSchema = z.object({
	name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
	email: z
		.email("Correo electrónico inválido")
		.min(1, "Correo electrónico es requerido"),
	password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
	repeatPassword: z
		.string()
		.min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export function RegisterCard({ className }: Props) {
	const navigate = useNavigate();

	const form = useAppForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			repeatPassword: "",
		},
		async onSubmit({ value, formApi }) {
			const { error } = await authClient.signUp.email({
				name: value.name,
				email: value.email,
				password: value.password,
			});

			if (error) {
				switch (error.code) {
					case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL": {
						formApi.setErrorMap({
							onSubmit: {
								fields: {
									email: "Ya existe una cuenta con este correo electrónico",
								},
							},
						});
						break;
					}
					default: {
						console.error("Error desconocido al registrarse:", error);
						formApi.setErrorMap({
							onSubmit: {
								fields: {},
								form: "Ha ocurrido un error desconocido. Por favor, inténtalo de nuevo más tarde.",
							},
						});
					}
				}

				return;
			}

			navigate({ to: "/dashboard" });
		},
		validators: {
			onChange: formSchema,
		},
	});

	const onSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		form.handleSubmit();
	};

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Registrarse</CardTitle>
				<FieldDescription>
					Introduce tu correo electrónico y contraseña para registrarte.
				</FieldDescription>
			</CardHeader>
			<CardContent>
				<form id={form.formId} onSubmit={onSubmit}>
					<FieldSet>
						<FieldGroup>
							{
								<form.AppField name="name">
									{(field) => (
										<field.InputField
											label="Nombre completo"
											type="text"
											autoComplete="name"
											placeholder="Evil Rabbit"
										/>
									)}
								</form.AppField>
							}

							{
								<form.AppField name="email">
									{(field) => (
										<field.InputField
											label="Correo electrónico"
											type="email"
											autoComplete="email"
											placeholder="evil.rabbit@example.com"
										/>
									)}
								</form.AppField>
							}

							{
								<form.AppField name="password">
									{(field) => (
										<field.InputField
											label="Contraseña"
											type="password"
											autoComplete="new-password"
											placeholder="••••••••"
										/>
									)}
								</form.AppField>
							}

							{
								<form.AppField
									name="repeatPassword"
									validators={{
										onChange: ({ value, fieldApi }) => {
											const password = fieldApi.form.getFieldValue("password");

											if (value !== password) {
												return "Las contraseñas no coinciden";
											}
										},
									}}
								>
									{(field) => (
										<field.InputField
											label="Repetir contraseña"
											type="password"
											autoComplete="new-password"
											placeholder="••••••••"
										/>
									)}
								</form.AppField>
							}
						</FieldGroup>
					</FieldSet>
				</form>
			</CardContent>
			<CardFooter className="flex">
				<form.AppForm>
					<form.FormRootError />
				</form.AppForm>

				<div className="ml-auto">
					<Link
						to="/auth/login"
						className={buttonVariants({ variant: "link" })}
					>
						¿Ya tienes una cuenta? Inicia sesión
					</Link>

					<form.AppForm>
						<form.SubmitButton label="Registrarse" />
					</form.AppForm>
				</div>
			</CardFooter>
		</Card>
	);
}
