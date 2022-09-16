<script lang="ts">
	import { setContext, onMount, onDestroy } from 'svelte';
	import type { QueryClient } from '@tanstack/query-core';
	import { client, clientSharing } from '$lib/queryClient/store.js';

	setContext<QueryClient>('queryClient', $client);
	setContext<boolean>('queryClientSharing', $clientSharing);

	onMount(() => {
		$client.mount();

		return () => {
			$client.unmount();
		};
	});
</script>

<slot />
