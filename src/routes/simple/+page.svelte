<script lang="ts">
	import { useQuery } from '$lib/query/useQuery.js';

	type Repo = {
		name: string;
		description: string;
		subscribers_count: number;
		stargazers_count: number;
		forks_count: number;
	};

	const queryResult = useQuery<Repo, Error>(
		['repoData'],
		async () =>
			await fetch('https://api.github.com/repos/SvelteStack/svelte-query').then((r) => r.json())
	);
</script>

<section class="px-4">
	<h1>Simple</h1>
	<div class="my-4">
		{#if $queryResult.isLoading}
			Loading...
		{/if}
		{#if $queryResult.error}
			An error has occurred:
			{$queryResult.error.message}
		{/if}
		{#if $queryResult.isSuccess}
			<div>
				<h1>{$queryResult.data.name}</h1>
				<p>{$queryResult.data.description}</p>
				<strong>👀 {$queryResult.data.subscribers_count}</strong>{' '}
				<strong>✨ {$queryResult.data.stargazers_count}</strong>{' '}
				<strong>🍴 {$queryResult.data.forks_count}</strong>
			</div>
		{/if}
	</div>
</section>
