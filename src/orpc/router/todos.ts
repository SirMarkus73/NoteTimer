import { os } from "@orpc/server";
import { eq } from "drizzle-orm";
import * as z from "zod";
import { db } from "#/db";
import { type NewTodo, todos } from "#/db/schema";

export const listTodos = os.input(z.object({})).handler(async () => {
	return await db.select().from(todos);
});

export const createTodo = os
	.input(z.object({ name: z.string() }))
	.handler(async ({ input }) => {
		const newTodo: NewTodo = {
			title: input.name,
		};

		return await db.insert(todos).values(newTodo).returning();
	});

export const deleteTodo = os
	.input(z.object({ id: z.number() }))
	.handler(async ({ input }) => {
		await db.delete(todos).where(eq(todos.id, input.id));

		return null;
	});
