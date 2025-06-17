import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
	conn: postgres.Sql | undefined;
};

const conn =
	globalForDb.conn ??
	postgres(import.meta.env.DATABASE_URL ?? "postgres://localhost:5432/mydb");
if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
