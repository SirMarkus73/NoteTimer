import { Link, useNavigate } from "@tanstack/react-router";
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
	email: z
		.email("Correo electrónico inválido")
		.min(1, "Correo electrónico es requerido"),
	password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export function LoginCard({ className }: Props) {
	const navigate = useNavigate();

	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			const res = await authClient.signIn.email({
				email: value.email,
				password: value.password,
			});

			if (res.data) {
				navigate({
					to: "/",
				});
				return;
			}

			if (res.error) {
				switch (res.error.code) {
					case "INVALID_EMAIL_OR_PASSWORD": {
						form.setErrorMap({
							onChange: {
								fields: {
									email: "Correo electrónico o contraseña incorrectos",
									password: "Correo electrónico o contraseña incorrectos",
								},
							},
						});
						break;
					}
					default: {
						form.setErrorMap({
							onChange: {
								fields: {
									email: "Error desconocido",
									password: "Error desconocido",
								},
							},
						});
						break;
					}
				}
			}
		},
		validators: {
			onChange: formSchema,
		},
	});

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Iniciar sesión</CardTitle>
				<FieldDescription>
					Introduce tu correo electrónico y contraseña para iniciar sesión.
				</FieldDescription>
			</CardHeader>
			<CardContent>
				<form
					id={form.formId}
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit(e);
					}}
				>
					<FieldSet>
						<FieldGroup>
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

							<form.AppField name="password">
								{(field) => (
									<field.InputField
										label="Contraseña"
										type="password"
										autoComplete="current-password"
										placeholder="Your password"
									/>
								)}
							</form.AppField>
						</FieldGroup>
					</FieldSet>
				</form>
			</CardContent>
			<CardFooter className="justify-end">
				<Link
					to="/auth/register"
					className={buttonVariants({ variant: "link" })}
				>
					¿No tienes una cuenta? Regístrate
				</Link>

				<form.AppForm>
					<form.SubmitButton label="Iniciar sesión" />
				</form.AppForm>
			</CardFooter>
		</Card>
	);
}
