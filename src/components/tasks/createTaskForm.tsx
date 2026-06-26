import type { SubmitEvent } from "react";
import { type NewTask, newTaskSchema } from "#/db/schema/tasks";
import { useAppForm } from "#/lib/forms/useAppForm";
import { useCreateTask } from "#/lib/tasks/useCreateTask";
import { today } from "#/lib/utils";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldSet,
	FieldTitle,
} from "../ui/field";

const defaultValues: NewTask = {
	title: "",
	plannedCompletion: undefined,
	status: undefined,
};

export function CreateTaskForm() {
	const { mutateAsync: createTask } = useCreateTask();

	const form = useAppForm({
		defaultValues,
		validators: {
			onChange: newTaskSchema,
		},
		async onSubmit({ value, formApi }) {
			try {
				await createTask({
					title: value.title,
					plannedCompletion: value.plannedCompletion,
					status: value.status,
				});
			} catch {
				formApi.setErrorMap({
					onSubmit: {
						fields: {},
						form: "Ocurrió un error desconocido, por favor intente nuevamente",
					},
				});
			}
		},
	});

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.handleSubmit();
	};

	return (
		<form
			onSubmit={handleSubmit}
			id={form.formId}
			className="w-full gap-4 border p-4"
		>
			<FieldSet>
				<div className="space-y-2">
					<FieldTitle>Crear Nueva Tarea</FieldTitle>
					<FieldDescription>Agregar nueva tarea, los campos</FieldDescription>
				</div>
				<FieldGroup>
					{
						<form.AppField name="title">
							{(field) => (
								<field.InputField label="Titulo de la tarea" required />
							)}
						</form.AppField>
					}

					{
						<form.AppField name="plannedCompletion">
							{(field) => (
								<field.DateField
									label="Fecha de finalización"
									startMonth={today()}
									disabled={(date) => date < today()}
								/>
							)}
						</form.AppField>
					}

					<Field>
						{
							<form.AppForm>
								<form.FormRootError />
								<form.SubmitButton label="Añadir tarea" />
							</form.AppForm>
						}
					</Field>
				</FieldGroup>
			</FieldSet>
		</form>
	);
}
