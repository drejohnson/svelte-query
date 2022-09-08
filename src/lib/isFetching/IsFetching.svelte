<script lang="ts">
	import type { QueryFilters } from '@tanstack/query-core';

	import { useIsFetching } from '$lib/isFetching/useIsFetching.js';

	export let filters: QueryFilters | undefined = undefined;
	export let isFetching: number | undefined = undefined;

	$: isFetchingResult = useIsFetching(filters);
	$: isFetching = $isFetchingResult;
</script>

<slot name="isFetching" {isFetching} />
