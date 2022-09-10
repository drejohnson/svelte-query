<script lang="ts">
	import { default as axios, AxiosError } from 'axios';
	import { useQuery } from '$lib/query/useQuery.js';
	import { useMutation } from '$lib/mutation/useMutation.js';
	import { clientStore } from '$lib/queryClientProvider/store.js';
	// import IsFetching from '$lib/isFetching/IsFetching.svelte';

	type Todos = {
		items: readonly {
			id: string;
			text: string;
		}[];
		ts: number;
	};

	let text: string;

	async function fetchTodos(): Promise<Todos> {
		const { data } = await axios.get('http://localhost:5173/api/data');
		return data;
	}

	function useTodos() {
		return useQuery(['todos'], fetchTodos);
	}

	const todos = useTodos();

	$: console.log($todos);

	const addTodoMutation = useMutation(
		(newTodo: string) => axios.post('http://localhost:5173/api/data', { text: newTodo }),
		{
			// When mutate is called:
			onMutate: async (newTodo: string) => {
				text = '';
				// Cancel any outgoing refetches (so they don't overwrite our optimistic update)
				await $clientStore.cancelQueries(['todos']);

				// Snapshot the previous value
				const previousTodos = $clientStore.getQueryData<Todos>(['todos']);

				// Optimistically update to the new value
				if (previousTodos) {
					$clientStore.setQueryData<Todos>(['todos'], {
						...previousTodos,
						items: [...previousTodos.items, { id: Math.random().toString(), text: newTodo }]
					});
				}

				return { previousTodos };
			},
			// If the mutation fails, use the context returned from onMutate to roll back
			onError: (err: any, variables: any, context: any) => {
				if (context?.previousTodos) {
					$clientStore.setQueryData<Todos>(['todos'], context.previousTodos);
				}
			},
			// Always refetch after error or success:
			onSettled: () => {
				$clientStore.invalidateQueries(['todos']);
			}
		}
	);
</script>

<p>
	In this example, new items can be created using a mutation. The new item will be optimistically
	added to the list in hopes that the server accepts the item. If it does, the list is refetched
	with the true items from the list. Every now and then, the mutation may fail though. When that
	happens, the previous list of items is restored and the list is again refetched from the server.
</p>

<form
	on:submit={(e) => {
		e.preventDefault();
		e.stopPropagation();
		$addTodoMutation.mutate(text);
	}}
>
	<div class="flex items-center py-2">
		<input
			class="appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 my-3 mr-4 leading-tight focus:outline-none focus:bg-white"
			type="text"
			bind:value={text}
		/>
		<button class="btn btn-primary my-3" disabled={$addTodoMutation.isLoading}>Create</button>
	</div>
</form>

{#if $todos.isSuccess}
	<div class="mb-4">
		Updated At: {new Date($todos.data.ts).toLocaleTimeString()}
	</div>
	<ul>
		{#each $todos.data.items as todo}
			<li>{todo.text}</li>
		{/each}
	</ul>
	<div>{$todos.isFetching ? 'Background Updating...' : ' '}</div>
	<div>{$todos.isLoading ? 'Loading...' : ' '}</div>
	<div>{$todos.error instanceof Error ? $todos.error.message : ' '}</div>
{/if}
