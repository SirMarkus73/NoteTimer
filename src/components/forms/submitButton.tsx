import { Button } from "#/components/ui/button";
import { Spinner } from "#/components/ui/spinner";
import { useFormContext } from "#/lib/forms/useAppForm";

type Props = {
	label: string;
};

export function SubmitButton({ label }: Props) {
	const form = useFormContext();
	console.log("MIRALOOOOOOOOO", form);

	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button type="submit" form="login-form" disabled={isSubmitting}>
					{isSubmitting && <Spinner />}
					{label}
				</Button>
			)}
		</form.Subscribe>
	);
}
