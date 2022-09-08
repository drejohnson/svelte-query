<script lang="ts">
	import type { DehydratedState, HydrateOptions } from '@tanstack/query-core';
	import { useHydrate } from '$lib/hydration/useHydrate.js';

	export let state: DehydratedState;
	export let options: HydrateOptions | undefined = undefined;

	useHydrate(state, options);
</script>

<slot />
