import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { authClient } from "#/lib/auth-client";

type Props = {
	className?: string;
};

export function LoginCard({ className }: Props) {
	const navigate = useNavigate();

	const form = useForm({
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
					id="login-form"
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit(e);
					}}
				>
					<FieldSet>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="email">Correo electrónico</FieldLabel>

								<form.Field name="email">
									{(field) => (
										<>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												type="email"
												autoComplete="off"
												placeholder="evil.rabbit@example.com"
											/>
											{field.state.meta.errors.length > 0 && (
												<FieldError>{field.state.meta.errors[0]}</FieldError>
											)}
										</>
									)}
								</form.Field>
							</Field>
							<Field>
								<FieldLabel htmlFor="password">Contraseña</FieldLabel>
								<form.Field name="password">
									{(field) => (
										<>
											{" "}
											<Input
												id={field.name}
												type="password"
												autoComplete="off"
												placeholder="••••••••"
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
											{field.state.meta.errors.length > 0 && (
												<FieldError>{field.state.meta.errors[0]}</FieldError>
											)}
										</>
									)}
								</form.Field>
							</Field>
						</FieldGroup>
					</FieldSet>
				</form>
			</CardContent>
			<CardFooter className="justify-end">
				<Button
					variant="link"
					role="link"
					render={<Link to="/auth/register" />}
				>
					¿No tienes una cuenta? Regístrate
				</Button>
				<form.Subscribe selector={(state) => state.isSubmitting}>
					{(isSubmitting) => (
						<Button type="submit" form="login-form" disabled={isSubmitting}>
							{isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
						</Button>
					)}
				</form.Subscribe>
			</CardFooter>
		</Card>
	);
}
