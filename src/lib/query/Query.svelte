<script lang="ts">
	import { useQuery } from '$lib/query/useQuery.js';
	import type { UseQueryOptions, UseQueryResult } from '$lib/types.js';

	type TQueryFnData = $$Generic<any>;
	type TError = $$Generic<any>;
	type TData = $$Generic<TQueryFnData>;
	type TQueryKey = $$Generic<QueryKey>;

	export let options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>;
	// useful for binding
	export let queryResult: UseQueryResult<TData, TError> | undefined = undefined;

	const query = useQuery(options);
	$: queryResult = $query;
</script>

<slot name="query" {queryResult} />
