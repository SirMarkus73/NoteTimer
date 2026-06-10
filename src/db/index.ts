import { drizzle } from "drizzle-orm/node-postgres";

import * as authSchema from "./schema/auth";
import * as tasksSchema from "./schema/tasks";

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL environment variable is not set");
}

export const db = drizzle(process.env.DATABASE_URL, {
	schema: { ...authSchema, ...tasksSchema },
});
