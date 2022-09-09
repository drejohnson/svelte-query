<script lang="ts">
	import '../app.postcss';
	import { page } from '$app/stores';
	import QueryClientProvider from '$lib/queryClientProvider/QueryClientProvider.svelte';
	import Nav from '$lib/_components/Nav.svelte';

	$: path = $page.url.pathname.split('/')[1];
</script>

<Nav {path} />

<QueryClientProvider>
	<main class="m-2">
		<slot />
	</main>
</QueryClientProvider>
