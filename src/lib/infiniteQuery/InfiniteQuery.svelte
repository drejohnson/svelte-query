<script lang="ts">
	import type { UseInfiniteQueryOptions } from '$lib/types.js';
	import { useInfiniteQuery } from '$lib/infiniteQuery/useInfiniteQuery.js';

	export let options: UseInfiniteQueryOptions;

	const query = useInfiniteQuery(options);
	$: queryResult = $query;
</script>

<slot name="query" {queryResult} />
