<script lang="ts">
	import { default as axios, AxiosError } from 'axios';
	import { useInfiniteQuery } from '$lib/infiniteQuery/useInfiniteQuery.js';

	const endPoint = 'https://swapi.dev/api';

	const fetchPlanets = async ({ pageParam = 1 }) => {
		const { data } = await axios.get(`${endPoint}/planets/?page=${pageParam}`);
		return data;
	};

	const queryOptions = {
		queryKey: 'planets',
		queryFn: fetchPlanets,
		//@ts-ignore
		getNextPageParam: (lastPage) => {
			if (lastPage.next) {
				const nextUrl = new URLSearchParams(new URL(lastPage.next).search);
				const nextCursor = nextUrl.get('page');
				if (nextCursor) {
					return +nextCursor;
				}
			}
			return undefined;
		}
	};

	const queryResult = useInfiniteQuery(['planets'], queryOptions);

	const { error }: { error: any } = $queryResult;
</script>

{#if $queryResult.status === 'loading'}
	Loading...
{:else if $queryResult.status === 'error'}
	<span>Error: {error.message}</span>
{:else}
	<div>
		{#each $queryResult.data.pages as { results }}
			{#each results as planet}
				<div class="card w-96 bg-neutral text-neutral-content mb-4">
					<div class="card-body">
						<h2 class="card-title">Planet Name: {planet.name}</h2>
						<p>Population: {planet.population}</p>
					</div>
				</div>
			{/each}
		{/each}
	</div>
	<div>
		<button
			class="btn btn-primary"
			on:click={() => $queryResult.fetchNextPage()}
			disabled={!$queryResult.hasNextPage || $queryResult.isFetchingNextPage}
		>
			{#if $queryResult.isFetching}
				Loading more...
			{:else if $queryResult.hasNextPage}
				Load More
			{:else}Nothing more to load{/if}
		</button>
	</div>
{/if}
