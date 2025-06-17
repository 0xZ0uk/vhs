import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { Get, UniversalHandler } from "@universal-middleware/core";

const createContext = async (req: Request) => {
	return createTRPCContext({
		headers: req.headers,
	});
};

export const trpcHandler = ((endpoint) => (request) => {
	return fetchRequestHandler({
		endpoint,
		req: request,
		router: appRouter,
		createContext: () => createContext(request),
		onError:
			process.env.NODE_ENV === "development"
				? ({ path, error }) => {
						console.error(
							`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
						);
					}
				: undefined,
	});
}) satisfies Get<[endpoint: string], UniversalHandler>;

// createContext({ req, resHeaders }) {
//   return {
//     ...context,
//     ...runtime,
//     req,
//     resHeaders,
//   };
// },
