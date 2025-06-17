import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/solid-query";
import { Show, createSignal } from "solid-js";
import type { Component } from "solid-js";

export const Post: Component = () => {
	const [title, setTitle] = createSignal("");

	const latestPosts = useQuery(() => ({
		queryKey: ["latestPosts"],
		queryFn: () => api.post.getLatest.query(),
	}));

	const createPost = useMutation(() => ({
		mutationKey: ["createPost"],
		mutationFn: (data: { title: string }) =>
			api.post.create.mutate({ name: data.title }),
		onSuccess: () => {
			latestPosts.refetch();
			setTitle("");
		},
	}));

	return (
		<div class="w-full">
			<Show
				when={latestPosts.data}
				fallback={<p class="text-gray-500">No posts found.</p>}
			>
				{(latestPosts) => (
					<p class="text-gray-500">
						Latest post: <span class="text-white">{latestPosts().name}</span>
					</p>
				)}
			</Show>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					createPost.mutate({ title: title() });
				}}
				class="flex flex-col gap-2"
			>
				<input
					type="text"
					placeholder="Title"
					value={title()}
					onChange={(e) => setTitle(e.target.value)}
					class="w-full rounded-full bg-white/10 px-4 py-2 text-white"
				/>
				<button
					type="submit"
					class="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
					disabled={createPost.isPending}
				>
					{createPost.isPending ? "Submitting..." : "Submit"}
				</button>
			</form>
		</div>
	);
};
