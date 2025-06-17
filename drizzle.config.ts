import type { Config } from "drizzle-kit";

export default {
	schema: "./src/server/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL ?? "postgres://localhost:5432/mydb",
	},
	tablesFilter: ["vhs_*"],
} satisfies Config;
