import { relations } from "drizzle-orm";
import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";
import type z from "zod";
import { today } from "#/lib/utils";
import { organization } from "./auth";

// Table
export const taskStatusEnum = pgEnum("task_status", [
	"pending",
	"in_progress",
	"completed",
]); // Define the enum for task status

export const tasks = pgTable("task", {
	id: serial().primaryKey(),
	organizationId: text()
		.notNull()
		.references(() => organization.id, {
			onDelete: "cascade",
			onUpdate: "cascade",
		}),
	title: text().notNull(),
	status: taskStatusEnum().default("pending").notNull(),

	plannedCompletion: timestamp("planned_completion"),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

// Relations
export const taskRelations = relations(tasks, ({ one }) => ({
	organization: one(organization, {
		fields: [tasks.organizationId],
		references: [organization.id],
	}),
}));

// Schemas
export const taskSchema = createSelectSchema(tasks);
export const newTaskSchema = createInsertSchema(tasks, {
	title: (s) => s.min(5, "El titulo debe tener al menos 5 caracteres"),
	plannedCompletion: (s) =>
		s
			.refine((date) => !date || date >= today(), {
				error: "La fecha de finalización planificada debe ser en el futuro",
			})
			.optional(),
}).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	organizationId: true,
});

export const updateTaskSchema = createUpdateSchema(tasks)
	.omit({
		createdAt: true,
		organizationId: true,
		updatedAt: true,
	})
	.required({
		id: true,
	});

export type Task = z.infer<typeof taskSchema>;
export type NewTask = z.infer<typeof newTaskSchema>;
export type TaskStatus = Task["status"];
