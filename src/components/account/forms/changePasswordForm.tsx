import type { SubmitEvent } from "react";
import z from "zod";
import { Button } from "#/components/ui/button";
import { Field, FieldGroup, FieldSet } from "#/components/ui/field";
import { authClient } from "#/lib/auth-client";
import { useAppForm } from "#/lib/forms/useAppForm";

const formSchema = z.object({
	currentPassword: z
		.string()
		.min(6, "La contraseña debe tener al menos 6 caracteres"),
	newPassword: z
		.string()
		.min(6, "La contraseña debe tener al menos 6 caracteres"),
	confirmNewPassword: z
		.string()
		.min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type Props = {
	onSuccess?: () => void;
	onError?: (error: unknown) => void;
	onCancel?: () => void;
};

export function ChangePasswordForm({ onSuccess, onError, onCancel }: Props) {
	const form = useAppForm({
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		},
		validators: {
			onChange: formSchema,
		},
		async onSubmit({ value, formApi }) {
			const { error } = await authClient.changePassword({
				currentPassword: value.currentPassword,
				newPassword: value.newPassword,
			});

			if (error) {
				onError?.(error);

				switch (error.code) {
					case "INVALID_PASSWORD": {
						formApi.setErrorMap({
							onSubmit: {
								fields: {
									currentPassword: "La contraseña actual es incorrecta",
								},
							},
						});

						return;
					}
					case "PASSWORD_TOO_SHORT": {
						formApi.setErrorMap({
							onSubmit: {
								fields: {
									newPassword: "La nueva contraseña es demasiado corta",
								},
							},
						});

						return;
					}
					default: {
						console.error(error);
						formApi.setErrorMap({
							onSubmit: {
								fields: {},
								form: "Ocurrió un error al cambiar la contraseña",
							},
						});
						return;
					}
				}
			}

			onSuccess?.();
		},
	});

	const onSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		form.handleSubmit();
	};

	return (
		<form id={form.formId} onSubmit={onSubmit}>
			<FieldSet>
				<FieldGroup>
					<form.AppField name="currentPassword">
						{(field) => (
							<field.InputField
								type="password"
								autoComplete="current-password"
								label="Contraseña actual"
							/>
						)}
					</form.AppField>

					<form.AppField
						name="newPassword"
						validators={{
							onChange: ({ value, fieldApi }) => {
								const currentPassword =
									fieldApi.form.getFieldValue("currentPassword");

								if (value === currentPassword) {
									return "La nueva contraseña no puede ser igual a la actual";
								}
							},
						}}
					>
						{(field) => (
							<field.InputField
								type="password"
								autoComplete="new-password"
								label="Nueva contraseña"
							/>
						)}
					</form.AppField>

					<form.AppField
						name="confirmNewPassword"
						validators={{
							onChange: ({ value, fieldApi }) => {
								const password = fieldApi.form.getFieldValue("newPassword");

								if (value !== password) {
									return "Las contraseñas no coinciden";
								}
							},
						}}
					>
						{(field) => (
							<field.InputField
								type="password"
								autoComplete="new-password"
								label="Confirmar nueva contraseña"
							/>
						)}
					</form.AppField>

					<Field orientation="horizontal" className="justify-end">
						<Button variant="secondary" type="button" onClick={onCancel}>
							Cancelar
						</Button>
						<form.AppForm>
							<form.SubmitButton label="Cambiar contraseña" />
						</form.AppForm>
					</Field>
				</FieldGroup>
			</FieldSet>
		</form>
	);
}
