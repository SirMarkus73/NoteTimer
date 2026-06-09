import { eq } from "drizzle-orm";
import * as z from "zod";
import { db } from "#/db";
import { type NewTodo, todos } from "#/db/schema/todos";
import { protectedBase } from "./base";

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
