<script lang="ts">
	import '../app.postcss';
	import { page } from '$app/stores';
	import QueryClient from '$lib/queryClient/QueryClient.svelte';
	import Nav from './_components/Nav.svelte';
	import Hydrate from '$lib/hydration/Hydrate.svelte';
	import { dehydratedState } from './_stores/hydrate.js';

	$: path = $page.url.pathname.split('/')[1];
</script>

<Nav {path} />

<QueryClient>
	<Hydrate state={$dehydratedState}>
		<main class="m-2">
			<slot />
		</main>
	</Hydrate>
</QueryClient>
