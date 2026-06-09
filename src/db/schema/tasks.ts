import { relations } from "drizzle-orm";
import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";
import { user } from "./auth";

export const taskStatusEnum = pgEnum("task_status", [
	"pending",
	"in_progress",
	"completed",
]); // Define the enum for task status

export const tasks = pgTable("task", {
	id: serial().primaryKey(),
	ownerId: text()
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	title: text().notNull(),
	status: taskStatusEnum().default("pending").notNull(),

	plannedCompletion: timestamp("planned_completion"),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const taskRelations = relations(tasks, ({ one }) => ({
	owner: one(user, {
		fields: [tasks.ownerId],
		references: [user.id],
	}),
}));

export const taskSchema = createSelectSchema(tasks);
export const newTaskSchema = createInsertSchema(tasks).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	ownerId: true,
});

export const updateTaskSchema = createUpdateSchema(tasks)
	.omit({
		createdAt: true,
		ownerId: true,
		updatedAt: true,
	})
	.required({
		id: true,
	});

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
export type TaskStatus = Task["status"];
