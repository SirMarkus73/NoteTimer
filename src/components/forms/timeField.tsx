import type { ComponentPropsWithoutRef } from "react";
import { Field, FieldError, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { useFieldContext } from "#/lib/forms/useAppForm";
import { cn } from "#/lib/utils";

type Props = { label: string } & ComponentPropsWithoutRef<typeof Input>;

export function TimeField({ label, className, ...props }: Props) {
	const { handleChange, state, name } = useFieldContext<string | undefined>();

	return (
		<Field>
			<FieldLabel htmlFor={name}>{label}</FieldLabel>
			<Input
				type="time"
				name={name}
				step="1"
				onChange={(e) =>
					handleChange(e.target.value === "" ? undefined : e.target.value)
				}
				value={state.value || ""}
				className={cn(
					"appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
					className,
				)}
				{...props}
			/>
			{state.meta.isDirty && state.meta.errors.length > 0 && (
				<FieldError>
					{typeof state.meta.errors[0] === "string"
						? state.meta.errors[0]
						: state.meta.errors[0]?.message || "Error desconocido"}
				</FieldError>
			)}{" "}
		</Field>
	);
}
