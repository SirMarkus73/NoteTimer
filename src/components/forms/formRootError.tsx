import { FieldError } from "#/components/ui/field";
import { useFormContext } from "#/lib/forms/useAppForm";

export function FormRootError() {
	const form = useFormContext();

	return (
		<form.Subscribe selector={(state) => state.errors?.[0]}>
			{(state) =>
				state && (
					<FieldError>
						{(typeof state === "string" && state) || "Error desconocido"}
					</FieldError>
				)
			}
		</form.Subscribe>
	);
}
