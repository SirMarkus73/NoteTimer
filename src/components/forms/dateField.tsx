import { format } from "date-fns";
import { es } from "date-fns/locale";
import { XIcon } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Calendar } from "#/components/ui/calendar";
import { Field, FieldError, FieldLabel } from "#/components/ui/field";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "#/components/ui/popover";
import { useFieldContext } from "#/lib/forms/useAppForm";
import { cn } from "#/lib/utils";

type CalendarProps = React.ComponentPropsWithoutRef<typeof Calendar>;

type Props = {
	label: string;
} & Omit<CalendarProps, "selected" | "onSelect" | "mode" | "defaultMonth">;

export function DateField({ label, ...calendarProps }: Props) {
	const field = useFieldContext<Date | undefined>();

	return (
		<Field>
			<FieldLabel
				htmlFor={field.name}
				className={cn(
					calendarProps.required &&
						"after:content-['requerido'] after:text-destructive",
				)}
			>
				{label}
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
							{...calendarProps}
							mode="single"
							selected={field.state.value || undefined}
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
					<XIcon className="size-4" />
				</Button>
			</div>
			{field.state.meta.errors?.[0]?.message && (
				<FieldError>{field.state.meta.errors[0].message}</FieldError>
			)}
		</Field>
	);
}
