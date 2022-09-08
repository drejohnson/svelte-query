<script lang="ts">
	import { setContext, onMount, onDestroy } from 'svelte';
	import {
		QueryClient,
		QueryCache,
		MutationCache,
		type DefaultOptions
	} from '@tanstack/query-core';

	// Props with default values
	export let queryCache = new QueryCache();
	export let mutationCache = new MutationCache();
	export let defaultOptions: DefaultOptions = {};
	export let client = new QueryClient({
		queryCache,
		mutationCache,
		defaultOptions
	});
	export let clientSharing = false;

	onMount(() => {
		client.mount();
	});

	setContext<QueryClient>('queryClient', client);
	setContext<boolean>('queryClientSharing', clientSharing);

	onDestroy(() => {
		client.unmount();
	});
</script>

<slot />
