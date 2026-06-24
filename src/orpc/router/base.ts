import { os } from "@orpc/server";
import { auth } from "#/lib/auth";

export const base = os.$context<{ headers: Headers }>().errors({
	BAD_REQUEST: {},
	NOT_FOUND: {},
	UNAUTHORIZED: {},
	FORBIDDEN: {},
	INTERNAL_SERVER_ERROR: {},
});

const getUserContext = async (headers: Headers) => {
	const sessionData = await auth.api.getSession({
		headers: headers,
	});

	if (!sessionData?.session || !sessionData?.user) {
		return null;
	}

	return {
		session: sessionData.session,
		user: sessionData.user,
	};
};

const authMiddleware = base.middleware(async ({ context, next, errors }) => {
	const { headers } = context;

	const userContext = await getUserContext(headers);

	if (!userContext) {
		throw errors.UNAUTHORIZED({
			message: "User is not authenticated",
		});
	}

	// Adds session and user to the context
	return next({
		context: {
			...userContext,
		},
	});
});

const orgMiddleware = base.middleware(async ({ context, next, errors }) => {
	const { headers } = context;

	const userContext = await getUserContext(headers);

	if (!userContext) {
		throw errors.UNAUTHORIZED({
			message: "User is not authenticated",
		});
	}

	const currentOrgId = userContext.session.activeOrganizationId;
	if (!currentOrgId) {
		throw errors.BAD_REQUEST({
			message: "No active organization selected",
		});
	}

	return next({
		context: {
			...userContext,
			activeOrganizationId: currentOrgId,
		},
	});
});

export const authenticatedBase = base.use(authMiddleware);
export const orgAuthenticatedBase = base.use(orgMiddleware);
