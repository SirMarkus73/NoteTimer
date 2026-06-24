import { createAccessControl } from "better-auth/plugins/access";
import {
	adminAc,
	defaultStatements,
	memberAc,
	ownerAc,
} from "better-auth/plugins/organization/access";

const statement = {
	...defaultStatements,
	task: ["create", "read", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const viewer = ac.newRole({
	task: ["read"],
});
export const editor = ac.newRole({
	...memberAc.statements,
	task: ["create", "read", "update", "delete"],
});

export const admin = ac.newRole({
	...adminAc.statements,
	task: ["create", "read", "update", "delete"],
});

export const owner = ac.newRole({
	...ownerAc.statements,
	task: ["create", "read", "update", "delete"],
});
