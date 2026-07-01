import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "#/db";
import {
	newTaskSchema,
	taskSchema,
	tasks,
	updateTaskSchema,
} from "#/db/schema/tasks";
import { auth } from "#/lib/auth";
import { authenticatedBase, orgAuthenticatedBase } from "./base";

const paginatedInputSchema = z.object({
	cursor: z.number().optional(),
	limit: z.number().optional(),
});

export const getTasksByCompletionDate = authenticatedBase
	.route({
		method: "GET",
		path: "/tasks/all",
		tags: ["tasks"],
	})
	.input(paginatedInputSchema)
	.handler(async ({ context: ctx, errors }) => {
		const { headers } = ctx;

		const organizations = await auth.api.listOrganizations({
			headers,
		});

		const orgsId = organizations.map((org) => org.id);

		try {
			const taskList = await db.query.tasks.findMany({
				where: (tasks, { inArray, isNotNull, and }) =>
					and(
						inArray(tasks.organizationId, orgsId),
						isNotNull(tasks.plannedCompletionDate),
					),
				with: {
					organization: {
						columns: {
							id: true,
							slug: true,
							name: true,
						},
					},
				},
				orderBy: (tasks, { asc }) => [
					asc(tasks.plannedCompletionDate),
					asc(tasks.plannedCompletionTime),
				],
			});

			const groupedTasks = new Map<string, typeof taskList>();

			for (const task of taskList) {
				const dateKey = task.plannedCompletionDate;

				if (!dateKey) continue;

				if (!groupedTasks.has(dateKey)) {
					groupedTasks.set(dateKey, []);
				}

				groupedTasks.get(dateKey)?.push(task);
			}

			return groupedTasks;
		} catch (error) {
			console.error("Error fetching tasks:", error);
			throw errors.INTERNAL_SERVER_ERROR({
				message: "Error fetching tasks",
			});
		}
	});

export const createTask = orgAuthenticatedBase
	.route({
		method: "POST",
		path: "/tasks",
		tags: ["tasks"],
	})
	.input(newTaskSchema)
	.handler(async ({ input, context: ctx, errors }) => {
		const { activeOrganizationId, headers } = ctx;

		await auth.api
			.hasPermission({
				headers,
				body: {
					permissions: {
						task: ["create"],
					},
				},
			})
			.catch(() => {
				throw errors.FORBIDDEN({
					message: "No tiene permiso para crear tareas",
				});
			});

		if (input.plannedCompletionTime && !input.plannedCompletionDate) {
			throw errors.BAD_REQUEST({
				message:
					"La hora de finalización no puede establecerse sin una fecha de finalización",
			});
		}

		const newTask = await db
			.insert(tasks)
			.values({
				...input,
				organizationId: activeOrganizationId,
			})
			.returning()
			.catch((error) => {
				console.error("Error creating task:", error);
				throw errors.INTERNAL_SERVER_ERROR({
					message: "Error creando una tarea, por favor intente nuevamente",
				});
			});

		return newTask;
	});

export const listTasks = orgAuthenticatedBase
	.route({
		method: "GET",
		path: "/tasks",
		tags: ["tasks"],
	})
	.input(paginatedInputSchema)
	.handler(async ({ context: ctx, errors, input }) => {
		const { headers, activeOrganizationId } = ctx;

		try {
			await auth.api.hasPermission({
				headers,
				body: {
					permissions: {
						task: ["read"],
					},
				},
			});
		} catch {
			throw errors.FORBIDDEN({
				message: "You do not have permission to read tasks",
			});
		}

		try {
			return await db.query.tasks.findMany({
				where: (tasks, { eq }) =>
					eq(tasks.organizationId, activeOrganizationId),
				limit: input?.limit ?? 10,
				offset: input?.cursor ?? 0,
			});
		} catch (error) {
			console.error(error);
			throw errors.INTERNAL_SERVER_ERROR({
				message: "Error fetching tasks",
				cause: error instanceof Error ? error.message : String(error),
			});
		}
	});

export const getTask = orgAuthenticatedBase
	.route({
		method: "GET",
		path: "/tasks/{id}",
		tags: ["tasks"],
	})
	.input(taskSchema.pick({ id: true }))
	.handler(async ({ input, context: ctx, errors }) => {
		const { headers, activeOrganizationId } = ctx;
		const { id } = input;

		await auth.api.hasPermission({
			headers,
			body: {
				permissions: {
					task: ["read"],
				},
			},
		});

		const task = await db.query.tasks.findFirst({
			where: (tasks, { and, eq }) =>
				and(eq(tasks.id, id), eq(tasks.organizationId, activeOrganizationId)),
		});

		if (!task) {
			throw errors.NOT_FOUND({
				message: `Task with id ${id} not found`,
				cause: `Task with id ${id} not found or you do not have permission to view it.`,
			});
		}
	});

export const updateTask = orgAuthenticatedBase
	.route({
		method: "PUT",
		path: "/tasks/{id}",
		tags: ["tasks"],
	})
	.input(updateTaskSchema)
	.handler(async ({ input, context: ctx, errors }) => {
		const { headers } = ctx;
		const task = await db.query.tasks.findFirst({
			where: (tasks, { and, eq }) =>
				and(
					eq(tasks.id, input.id),
					eq(tasks.organizationId, ctx.activeOrganizationId),
				),
		});

		if (!task) {
			throw errors.NOT_FOUND({
				message: `Task with id ${input.id} not found`,
				cause: `Task with id ${input.id} not found or you do not have permission to update it.`,
			});
		}

		await auth.api
			.hasPermission({
				headers,
				body: {
					permissions: {
						task: ["update"],
					},
				},
			})
			.catch(() => {
				throw errors.FORBIDDEN({
					message: `You do not have permission to update this task`,
					cause: `Task with id ${input.id} not found or you do not have permission to update it.`,
				});
			});

		const updatedTask = await db
			.update(tasks)
			.set(input)
			.where(eq(tasks.id, input.id))
			.returning();

		if (updatedTask.length === 0) {
			throw errors.NOT_FOUND({
				cause: `Task with id ${input.id} not found or you do not have permission to update it.`,
				message: "Task not found or unauthorized",
			});
		}

		return updatedTask[0];
	});

export const deleteTask = orgAuthenticatedBase
	.route({
		method: "DELETE",
		path: "/tasks/{id}",
		tags: ["tasks"],
	})
	.input(taskSchema.pick({ id: true }))
	.handler(async ({ input, context: ctx, errors }) => {
		const { headers } = ctx;

		const task = await db.query.tasks.findFirst({
			where: (tasks, { and, eq }) =>
				and(
					eq(tasks.id, input.id),
					eq(tasks.organizationId, ctx.activeOrganizationId),
				),
		});

		if (!task) {
			throw errors.NOT_FOUND({
				message: `Task with id ${input.id} not found`,
				cause: `Task with id ${input.id} not found or you do not have permission to delete it.`,
			});
		}

		await auth.api
			.hasPermission({
				headers,
				body: {
					permissions: {
						task: ["delete"],
					},
				},
			})
			.catch(() => {
				throw errors.NOT_FOUND({
					message: `Task with id ${input.id} not found`,
					cause: `Task with id ${input.id} not found or you do not have permission to delete it.`,
				});
			});

		const deletedTask = await db
			.delete(tasks)
			.where(eq(tasks.id, input.id))
			.returning();

		if (deletedTask.length === 0) {
			throw errors.NOT_FOUND({
				cause: `Task with id ${input.id} not found or you do not have permission to delete it.`,
				message: "Task not found or unauthorized",
			});
		}

		return deletedTask[0];
	});
