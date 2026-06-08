import { Link } from "@tanstack/react-router";
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
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";

type Props = {
	className?: string;
};

export function RegisterCard({ className }: Props) {
	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Registrarse</CardTitle>
				<FieldDescription>
					Introduce tu correo electrónico y contraseña para registrarte.
				</FieldDescription>
			</CardHeader>
			<CardContent>
				<form id="register-form">
					<FieldSet>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="name">Nombre completo</FieldLabel>
								<Input
									id="name"
									type="text"
									autoComplete="off"
									placeholder="Evil Rabbit"
								/>
							</Field>

							<Field>
								<FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
								<Input
									id="email"
									type="email"
									autoComplete="off"
									placeholder="evil.rabbit@example.com"
								/>
							</Field>

							<Field>
								<FieldLabel htmlFor="password">Contraseña</FieldLabel>
								<Input
									id="password"
									type="password"
									autoComplete="off"
									placeholder="••••••••"
								/>
							</Field>
						</FieldGroup>
					</FieldSet>
				</form>
			</CardContent>
			<CardFooter className="justify-end">
				<Button variant="link" role="link" render={<Link to="/auth/login" />}>
					¿Ya tienes una cuenta? Inicia sesión
				</Button>
				<Button type="submit" form="register-form">
					Registrarse
				</Button>
			</CardFooter>
		</Card>
	);
}
