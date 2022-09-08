<script lang="ts">
	import type { MutationFilters } from '@tanstack/query-core';

	import { useIsMutating } from '$lib/isMutating/useIsMutating.js';

	export let filters: MutationFilters | undefined = undefined;
	export let isMutating: number | undefined = undefined;

	$: isMutatingResult = useIsMutating(filters);
	$: isMutating = $isMutatingResult;
</script>

<slot name="isMutating" {isMutating} />
