import { vikeHandler } from "./server/vike-handler";
import { Hono } from "hono";
import { createHandler } from "@universal-middleware/hono";
import { trpcHandler } from "./server/trpc-handler";

const app = new Hono();

app.use("/api/trpc/*", createHandler(trpcHandler)("/api/trpc"));

/**
 * Vike route
 *
 * @link {@see https://vike.dev}
 **/
app.all("*", createHandler(vikeHandler)());

export default app;
