<script lang="ts">
	import { useQuery } from '$lib/query/useQuery.js';
	import type { UseQueryOptions } from '$lib/types.js';

	export let options: UseQueryOptions;

	const query = useQuery(options);
	$: queryResult = $query;
</script>

<slot name="query" {queryResult} />
