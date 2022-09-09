<script lang="ts">
	// @ts-ignore
	import { useQuery } from '$lib/query/useQuery';

	const queryResult = useQuery(['repoData'], async () => {
		const res = await fetch('https://api.github.com/repos/SvelteStack/svelte-query');
		return await res.json();
	});
</script>

<section class="px-4">
	<h1>Simple</h1>
	<div class="my-4">
		{#if $queryResult.isLoading}
			Loading...
		{:else if $queryResult.error}
			An error has occurred:
			{$queryResult.error.message}
		{:else}
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
