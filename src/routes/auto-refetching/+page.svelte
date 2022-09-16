<script lang="ts">
	import { useMutation } from '$lib/mutation/useMutation.js';
	import { useQuery } from '$lib/query/useQuery.js';
	import { useQueryClient } from '$lib/queryClient/useQueryClient.js';

	let intervalMs = 1000;
	let value: string;

	const client = useQueryClient();

	const endpoint = 'http://localhost:5173/api/auto-refetch';

	const todos = useQuery<{ items: string[] }, Error>(
		['refetch'],
		async () => await fetch(endpoint).then((r) => r.json()),
		{
			// Refetch the data every second
			refetchInterval: intervalMs
		}
	);

	const addMutation = useMutation(
		(value: string) => fetch(`${endpoint}?add=${value}`).then((r) => r.json()),
		{ onSuccess: () => client.invalidateQueries(['refetch']) }
	);
	const clearMutation = useMutation(() => fetch(`${endpoint}?clear=1`).then((r) => r.json()), {
		onSuccess: () => client.invalidateQueries(['refetch'])
	});
</script>

<h1>Auto Refetch with stale-time set to 1s</h1>

<p>
	This example is best experienced on your own machine, where you can open multiple tabs to the same
	localhost server and see your changes propagate between the two.
</p>

<label>
	Query Interval speed (ms):{' '}
	<div class="flex">
		<input
			class="appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 my-3 mr-4 leading-tight focus:outline-none focus:bg-white"
			bind:value={intervalMs}
			type="number"
			step="100"
		/>{' '}
		<span
			class="inline-block ml-2 w-3 h-3 rounded-full scale-150 {$todos.isFetching
				? 'bg-green-500'
				: 'bg-transparent'} {$todos.isFetching ? 'transition-all duration-1000 ease-in-out' : ''}"
		/>
	</div>
</label>
<h2>Todo List</h2>
<form
	on:submit={(e) => {
		e.preventDefault();
		e.stopPropagation();
		$addMutation.mutate(value, {
			onSuccess: () => (value = '')
		});
	}}
>
	<input
		class="appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 my-3 mr-4 leading-tight focus:outline-none focus:bg-white"
		placeholder="enter something"
		bind:value
	/>
</form>

{#if $todos.isLoading}
	Loading...
{/if}
{#if $todos.error}
	An error has occurred:
	{$todos.error.message}
{/if}
{#if $todos.isSuccess}
	<ul>
		{#each $todos.data.items as item}
			<li>{item}</li>
		{/each}
	</ul>
	<div>
		<button class="btn btn-primary my-3" on:click={() => $clearMutation.mutate(undefined)}>
			Clear All
		</button>
	</div>
{/if}
{#if $todos.isFetching}
	<div class="text-green-600 font-bold">'Background Refecting...' : ' '</div>
{/if}
