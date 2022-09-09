<script lang="ts">
	import { setContext, onMount, onDestroy } from 'svelte';
	import type { QueryClient } from '@tanstack/query-core';
	import { clientStore, clientSharingStore } from '$lib/queryClientProvider/store.js';

	export let client = $clientStore;
	export let clientSharing = $clientSharingStore;

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
