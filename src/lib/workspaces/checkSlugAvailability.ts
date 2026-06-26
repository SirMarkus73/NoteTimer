import { authClient } from "../auth-client";

export async function checkSlugAvailability(slug: string): Promise<{
	error: {
		code: string;
		message: string;
	} | null;
}> {
	const { error } = await authClient.organization.checkSlug({
		slug,
	});

	if (error) {
		switch (error.code) {
			case "ORGANIZATION_SLUG_ALREADY_TAKEN": {
				return {
					error: {
						code: "ORGANIZATION_SLUG_ALREADY_TAKEN",
						message: "El slug ya está en uso. Por favor, elige otro.",
					},
				};
			}
			default: {
				console.error(
					`Error desconocido al verificar el slug: ${error.code} - ${error.message}`,
				);

				return {
					error: {
						code: error.code || "UNKNOWN_ERROR",
						message:
							"Error desconocido al verificar el slug. Por favor, inténtalo de nuevo.",
					},
				};
			}
		}
	}

	return {
		error: null,
	};
}
