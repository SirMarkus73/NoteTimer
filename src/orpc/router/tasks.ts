import { ORPCError } from "@orpc/client";
import { and, eq } from "drizzle-orm";
import z from "zod";
import { db } from "#/db";
import {
	newTaskSchema,
	taskSchema,
	tasks,
	updateTaskSchema,
} from "#/db/schema/tasks";
import { protectedBase } from "./base";

export const createTask = protectedBase
	.route({
		method: "POST",
		path: "/tasks",
		tags: ["tasks"],
	})
	.input(newTaskSchema)
	.handler(async ({ input, context: ctx }) => {
		const newTask = await db
			.insert(tasks)
			.values({
				...input,
				ownerId: ctx.user.id,
			})
			.returning();

		return newTask;
	});

export const listTasks = protectedBase
	.route({
		method: "GET",
		path: "/tasks",
		tags: ["tasks"],
	})
	.input(
		z
			.object({
				cursor: z.number().optional(),
				limit: z.number().optional(),
			})
			.optional(),
	)
	.handler(async ({ context: ctx }) => {
		const tasks = await db.query.tasks.findMany({
			where: (tasks, { eq }) => eq(tasks.ownerId, ctx.user.id),
		});

		return tasks;
	});

export const getTask = protectedBase
	.route({
		method: "GET",
		path: "/tasks/{id}",
		tags: ["tasks"],
	})
	.input(taskSchema.pick({ id: true }))
	.handler(async ({ input, context: ctx }) => {
		const task = await db.query.tasks.findFirst({
			where: (tasks, { eq, and }) =>
				and(eq(tasks.id, input.id), eq(tasks.ownerId, ctx.user.id)),
		});

		if (!task) {
			throw new ORPCError("NOT_FOUND", {
				cause: `Task with id ${input.id} not found or you do not have permission to view it.`,
				message: "Task not found or unauthorized",
			});
		}

		return task;
	});

export const updateTask = protectedBase
	.route({
		method: "PUT",
		path: "/tasks/{id}",
		tags: ["tasks"],
	})
	.input(updateTaskSchema)
	.handler(async ({ input, context: ctx }) => {
		const updatedTask = await db
			.update(tasks)
			.set(input)
			.where(and(eq(tasks.id, input.id), eq(tasks.ownerId, ctx.user.id)))
			.returning();

		if (updatedTask.length === 0) {
			throw new ORPCError("NOT_FOUND", {
				cause: `Task with id ${input.id} not found or you do not have permission to update it.`,
				message: "Task not found or unauthorized",
			});
		}

		return updatedTask[0];
	});

export const deleteTask = protectedBase
	.route({
		method: "DELETE",
		path: "/tasks/{id}",
		tags: ["tasks"],
	})
	.input(taskSchema.pick({ id: true }))
	.handler(async ({ input, context: ctx }) => {
		const deletedTask = await db
			.delete(tasks)
			.where(and(eq(tasks.id, input.id), eq(tasks.ownerId, ctx.user.id)))
			.returning();

		if (deletedTask.length === 0) {
			throw new ORPCError("NOT_FOUND", {
				cause: `Task with id ${input.id} not found or you do not have permission to delete it.`,
				message: "Task not found or unauthorized",
			});
		}

		return deletedTask[0];
	});
