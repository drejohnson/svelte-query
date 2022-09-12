<script lang="ts">
	import Mutation from '$lib/mutation/Mutation.svelte';
	import Query from '$lib/query/Query.svelte';

	import { useQueryClient } from '$lib/queryClientProvider/index.js';

	import { default as axios } from 'axios';

	type Todos = {
		items: readonly {
			id: string;
			text: string;
		}[];
		ts: number;
	};

	const endPoint = 'http://localhost:5173/api/data';

	const client = useQueryClient();

	let text: string;

	// Query
	const fetchTodos = async () => {
		const { data } = await axios.get(endPoint);
		return data;
	};
	const queryOptions = {
		queryKey: ['todos'],
		queryFn: fetchTodos
	};

	// Mutation
	$: addTodo = (text: string) => axios.post(endPoint, { text });
	const mutationOptions = {
		onMutate: (todo: any) => {
			text = '';
			client.cancelQueries(['todos']);

			const previousValue = client.getQueryData<Todos>(['todos']);

			client.setQueryData<Todos>(['todos'], (old: any) => ({
				...old,
				items: [...old.items, todo]
			}));

			return previousValue;
		},
		// On failure, roll back to the previous value
		onError: (err: any, variables: any, previousValue: any) =>
			client.setQueryData(['todos'], previousValue),
		// After success or failure, refetch the todos query
		onSettled: () => {
			client.invalidateQueries(['todos']);
		}
	};
</script>

<p>
	In this example, new items can be created using a mutation. The new item will be optimistically
	added to the list in hopes that the server accepts the item. If it does, the list is refetched
	with the true items from the list. Every now and then, the mutation may fail though. When that
	happens, the previous list of items is restored and the list is again refetched from the server.
</p>

<Mutation mutationFn={addTodo} options={mutationOptions}>
	<div slot="mutation" let:mutationResult>
		<form
			on:submit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				mutationResult.mutate(text);
			}}
		>
			<input type="text" bind:value={text} />
			<button>Create</button>
		</form>
	</div>
</Mutation>

<Query options={queryOptions}>
	<div slot="query" let:queryResult>
		{#if queryResult.isLoading}
			Loading...
		{/if}
		{#if queryResult.error}
			An error has occurred:
			{queryResult.error.message}
		{/if}

		{#if queryResult.isSuccess}
			<div class="mb-4">
				Updated At: {new Date(queryResult?.data.ts).toLocaleTimeString()}
			</div>
			<ul>
				{#each queryResult.data?.items as todo}
					{#if todo.text}
						<li>{todo.text}</li>
					{/if}
				{/each}
			</ul>
		{/if}
		{#if queryResult?.isFetching}
			<div class="text-green-600 font-bold">'Background Updating...' : ' '</div>
		{/if}
	</div>
</Query>
