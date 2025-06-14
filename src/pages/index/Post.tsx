import { Button } from "../../components/Button.js";
import { Input } from "@/components/Input";
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/solid-query";
import { createSignal } from "solid-js";


export function Post() {
	const [title, setTitle] = createSignal<string>("");

	const [result, setResult] = createSignal<{ message: string } | undefined>(
		undefined,
	);

	const { mutate } = useMutation(() => ({
		mutationFn: ({ title }: { title: string }) => {
			return api.post.create.mutate({ title });
		},
		onSuccess: (data) => {
			setResult(data);
		},
	}));

	const handleChangeCasseteTitle = (value: string) => {
		setTitle(value);
	};

	return (
		<div class="space-y-2">
			<Input
				type="text"
				value={title()}
				onChange={(e) => handleChangeCasseteTitle(e.currentTarget.value)}
			/>
			<Button
				size="lg"
				onClick={() => {
					mutate({ title: title() });
				}}
			>
				Try the "Hello VHS" tRPC route
			</Button>
			{result() && (
				<pre class="rounded-md bg-muted p-2 text-muted-foreground">
					{result()?.message}
				</pre>
			)}
		</div>
	);
}
