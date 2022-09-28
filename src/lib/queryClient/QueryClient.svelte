<script lang="ts">
	import { onMount } from 'svelte';
	import {
		QueryClient,
		QueryCache,
		MutationCache,
		type DefaultOptions
	} from '@tanstack/query-core';
	import { setQueryClientContext } from '$lib/context.js';

	// Props with default values
	const queryCache = new QueryCache();
	const mutationCache = new MutationCache();
	const defaultOptions: DefaultOptions = {};
	const client = new QueryClient({
		queryCache,
		mutationCache,
		defaultOptions
	});

	setQueryClientContext(client);

	onMount(() => {
		client.mount();

		return () => {
			client.unmount();
		};
	});
</script>

<slot />
