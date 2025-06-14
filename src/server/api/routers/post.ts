import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const postRouter = createTRPCRouter({
    	hello: publicProcedure.query(() => {
		return {
			message: "Hello from VHS",
		};
	}),
	create: publicProcedure
		.input(z.object({ title: z.string() }))
		.mutation(({ input }) => {
			return {
				message: `Now playing: ${input.title}`,
			};
		}),
})