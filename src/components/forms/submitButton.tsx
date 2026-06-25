import { Button } from "#/components/ui/button";
import { Spinner } from "#/components/ui/spinner";
import { useFormContext } from "#/lib/forms/useAppForm";

type Props = {
	label: string;
};

export function SubmitButton({ label }: Props) {
	const form = useFormContext();

	return (
		<form.Subscribe
			selector={(state) => ({
				isSubmitting: state.isSubmitting,
				isValid: state.isValid,
				isValidating: state.isValidating,
			})}
		>
			{({ isSubmitting, isValid, isValidating }) => (
				<Button
					type="submit"
					form={form.formId}
					disabled={isSubmitting || !isValid || isValidating}
				>
					{(isSubmitting || isValidating) && <Spinner />}
					{label}
				</Button>
			)}
		</form.Subscribe>
	);
}
