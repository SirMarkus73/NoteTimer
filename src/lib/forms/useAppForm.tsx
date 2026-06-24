import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { InputField } from "#/components/forms/inputField";
import { SubmitButton } from "#/components/forms/submitButton";

const { fieldContext, formContext, useFormContext, useFieldContext } =
	createFormHookContexts();

// Allow us to bind components to the form to keep type safety but reduce production boilerplate
// Define this once to have a generator of consistent form instances throughout your app
const { useAppForm } = createFormHook({
	fieldComponents: {
		InputField,
	},
	formComponents: {
		SubmitButton,
	},
	fieldContext,
	formContext,
});

export { useAppForm, useFormContext, useFieldContext };
