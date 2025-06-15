import vikeSolid from 'vike-solid/config'
import vikeSolidQuery from 'vike-solid-query/config'
import type { Config } from "vike/types";
import Layout from "../layouts/LayoutDefault.js";
import SuperJSON from 'superjson';
import { defaultShouldDehydrateQuery } from '@tanstack/solid-query';

// Default config (can be overridden by pages)
// https://vike.dev/config
export default {
  // https://vike.dev/Layout
  Layout,
  // https://vike.dev/head-tags
  title: "My Vike App",
  description: "Demo showcasing Vike",

  extends: [vikeSolid, vikeSolidQuery],
  queryClientConfig: {
		defaultOptions: {
			queries: {
				// With SSR, we usually want to set some default staleTime
				// above 0 to avoid refetching immediately on the client
				staleTime: 30 * 1000,
			},
			dehydrate: {
				serializeData: SuperJSON.serialize,
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) ||
					query.state.status === "pending",
			},
			hydrate: {
				deserializeData: SuperJSON.deserialize,
			},
		},
  }
} satisfies Config;
