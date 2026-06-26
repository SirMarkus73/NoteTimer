import { useFieldContext } from "#/lib/forms/useAppForm";
import { cn } from "#/lib/utils";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type Props = {
	label: string;
} & React.ComponentPropsWithoutRef<typeof Input>;

export function InputField({ label, ...props }: Props) {
	const field = useFieldContext<string>();

	return (
		<Field>
			<FieldLabel
				htmlFor={field.name}
				className={cn(
					props.required &&
						"after:content-['requerido'] after:text-destructive",
				)}
			>
				{label}
			</FieldLabel>

			<Input
				id={field.name}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				{...props}
			/>
			{field.state.meta.errors.length > 0 && (
				<FieldError>
					{typeof field.state.meta.errors[0] === "string"
						? field.state.meta.errors[0]
						: field.state.meta.errors[0]?.message || "Error desconocido"}
				</FieldError>
			)}
		</Field>
	);
}
