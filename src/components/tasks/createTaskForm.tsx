import { isDefinedError } from "@orpc/client";
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
	plannedCompletionDate: undefined,
	plannedCompletionTime: undefined,
	status: undefined,
};

export function CreateTaskForm() {
	const { mutate: createTask } = useCreateTask();

	const form = useAppForm({
		defaultValues,
		validators: {
			onChange: newTaskSchema,
		},

		async onSubmit({ value, formApi }) {
			createTask(
				{
					title: value.title,
					plannedCompletionDate: value.plannedCompletionDate,
					plannedCompletionTime: value.plannedCompletionTime,
					status: value.status,
				},
				{
					onError: (error) => {
						if (isDefinedError(error)) {
							formApi.setErrorMap({
								onSubmit: {
									fields: {},
									form: error.message,
								},
							});
						} else {
							formApi.setErrorMap({
								onSubmit: {
									fields: {},
									form: "Ha ocurrido un error desconocido, por favor intente nuevamente",
								},
							});
						}
					},
				},
			);
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
						<form.AppField name="plannedCompletionDate">
							{(field) => (
								<field.DateField
									label="Fecha de finalización"
									startMonth={today()}
									disabled={(date) => date < today()}
								/>
							)}
						</form.AppField>
					}

					{
						<form.AppField name="plannedCompletionTime">
							{(field) => <field.TimeField label="Hora de finalización" />}
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
