<script lang="ts">
	import { onMount } from 'svelte';

	import type { UseQueryOptions } from '../types.js';
	import { useQueries } from '$lib/queries/useQueries.js';

	type TQueryOptions = readonly UseQueryOptions[] | readonly [...UseQueryOptions[]];

	export let queries: TQueryOptions;

	const queriesStore = useQueries(queries);
	$: currentResult = $queriesStore;
</script>

<slot name="queries" {currentResult} />
