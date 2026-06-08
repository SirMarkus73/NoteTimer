import { ORPCError, os } from "@orpc/server";
import { eq } from "drizzle-orm";
import * as z from "zod";
import { db } from "#/db";
import { type NewTodo, todos } from "#/db/schema/todos";
import { auth } from "#/lib/auth";

export const base = os.$context<{ headers: Headers }>();

export const authMiddleware = base.middleware(async ({ context, next }) => {
	const sessionData = await auth.api.getSession({
		headers: context.headers, // or reqHeaders if you're using the plugin
	});

	if (!sessionData?.session || !sessionData?.user) {
		throw new ORPCError("UNAUTHORIZED");
	}

	// Adds session and user to the context
	return next({
		context: {
			session: sessionData.session,
			user: sessionData.user,
		},
	});
});

export const protectedBase = base.use(authMiddleware);

export const listTodos = protectedBase.input(z.object({})).handler(async () => {
	return await db.select().from(todos);
});

export const createTodo = protectedBase
	.input(z.object({ name: z.string() }))
	.handler(async ({ input }) => {
		const newTodo: NewTodo = {
			title: input.name,
		};

		return await db.insert(todos).values(newTodo).returning();
	});

export const deleteTodo = protectedBase
	.input(z.object({ id: z.number() }))
	.handler(async ({ input }) => {
		await db.delete(todos).where(eq(todos.id, input.id));

		return null;
	});
