import { useForm } from "@tanstack/react-form";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { X } from "lucide-react";
import type { SubmitEvent } from "react";
import { type NewTask, newTaskSchema } from "#/db/schema/tasks";
import { useCreateTask } from "#/lib/tasks/useCreateTask";
import { today } from "#/lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
	FieldTitle,
} from "../ui/field";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const defaultValues: NewTask = {
	title: "",
	plannedCompletion: undefined,
	status: undefined,
};

export function CreateTaskForm() {
	const { mutate: createTask, error } = useCreateTask();

	const form = useForm({
		defaultValues,
		validators: {
			onChange: newTaskSchema,
		},
		onSubmit: ({ value }) => {
			createTask({
				title: value.title,
				plannedCompletion: value.plannedCompletion,
				status: value.status,
			});
		},
	});

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.handleSubmit();
	};

	return (
		<form onSubmit={handleSubmit} className="grid w-full gap-4 border p-4">
			<FieldSet>
				<div className="space-y-2">
					<FieldTitle>Crear Nueva Tarea</FieldTitle>
					<FieldDescription>Agregar nueva tarea, los campos</FieldDescription>
				</div>
				<FieldGroup>
					{
						<form.Field name="title">
							{(field) => (
								<Field>
									<FieldLabel htmlFor={field.name}>
										Titulo de la tarea*
									</FieldLabel>
									<Input
										name={field.name}
										id={field.name}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
									/>
									{field.state.meta.errors?.[0]?.message && (
										<FieldError>
											{field.state.meta.errors[0].message}
										</FieldError>
									)}
								</Field>
							)}
						</form.Field>
					}

					{
						<form.Field name="plannedCompletion">
							{(field) => (
								<Field>
									<FieldLabel htmlFor={field.name}>
										Fecha de finalización
									</FieldLabel>
									<div className="flex items-center gap-2">
										<Popover>
											<PopoverTrigger
												render={
													<Button
														variant="outline"
														id={field.name}
														className="justify-start font-normal flex-1"
													>
														{field.state.value ? (
															format(field.state.value, "PPP", {
																locale: es,
															})
														) : (
															<span>Selecciona una fecha</span>
														)}
													</Button>
												}
											/>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.state.value || undefined}
													startMonth={new Date()}
													disabled={(date) => date < today()}
													onSelect={(date) => {
														field.handleChange(date);
													}}
													defaultMonth={field.state.value || new Date()}
												/>
											</PopoverContent>
										</Popover>
										<Button
											size="icon"
											type="button"
											variant="outline"
											aria-label="Eliminar fecha"
											title="Eliminar fecha"
											onClick={() => field.handleChange(undefined)}
										>
											<X className="size-4" />
										</Button>
									</div>
									{field.state.meta.errors?.[0]?.message && (
										<FieldError>
											{field.state.meta.errors[0].message}
										</FieldError>
									)}
								</Field>
							)}
						</form.Field>
					}
					<Field>
						{error && <FieldError>Ocurrió un error desconocido</FieldError>}
						<Button type="submit">Add Task </Button>
					</Field>
				</FieldGroup>
			</FieldSet>
		</form>
	);
}
