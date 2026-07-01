import { relations, sql } from "drizzle-orm";
import {
	check,
	date,
	pgEnum,
	pgTable,
	serial,
	text,
	time,
	timestamp,
} from "drizzle-orm/pg-core";
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

export const tasks = pgTable(
	"task",
	{
		id: serial().primaryKey(),
		organizationId: text()
			.notNull()
			.references(() => organization.id, {
				onDelete: "cascade",
				onUpdate: "cascade",
			}),
		title: text().notNull(),
		status: taskStatusEnum().default("pending").notNull(),

		plannedCompletionDate: date("planned_completion"),
		plannedCompletionTime: time("planned_completion_time"),
		createdAt: timestamp("created_at").defaultNow(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [
		check(
			"planned_completion_date_on_future",
			sql`${table.plannedCompletionDate} >= CURRENT_DATE`,
		),
		check(
			"planned_completion_time_requires_date",
			sql`${table.plannedCompletionTime} IS NULL OR ${table.plannedCompletionDate} IS NOT NULL`,
		),
	],
);

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
	plannedCompletionDate: (s) =>
		s
			.refine((date) => !date || new Date(date) >= today(), {
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
