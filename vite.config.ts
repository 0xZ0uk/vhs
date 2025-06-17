import devServer from "@hono/vite-dev-server";
import UnoCSS from "unocss/vite";
import vikeSolid from "vike-solid/vite";
import vike from "vike/plugin";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		UnoCSS(),
		vike(),
		devServer({
			entry: "src/hono-entry.ts",
			exclude: [
				/^\/@.+$/,
				/.*\.(ts|tsx|vue)($|\?)/,
				/.*\.(s?css|less)($|\?)/,
				/^\/favicon\.ico$/,
				/.*\.(svg|png)($|\?)/,
				/^\/(public|assets|static)\/.+/,
				/^\/node_modules\/.*/,
			],
			injectClientScript: false,
		}),
		vikeSolid(),
	],
	build: {
		target: "es2022",
	},
	resolve: {
		alias: {
			"@": "/src",
		},
	},
});
