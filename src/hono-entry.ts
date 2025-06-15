import { createHandler } from "@universal-middleware/hono";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { vikeHandler } from "./server/vike-handler";
import { trpcHandler } from "./trpc/server";

const app = new Hono();

app.use("*", cors());

app.use("/api/trpc/*", createHandler(trpcHandler)("/api/trpc"));

/**
 * Vike route
 *
 * @link {@see https://vike.dev}
 **/
app.all("*", createHandler(vikeHandler)());

export default app;
