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

<!-- The QueryClient Component really isn't need since the client is a reactive store -->
<!-- and can be passed to any component via useQueryClient -->
<QueryClient>
	<!-- Hydration is being use for posts in the /basic route  -->
	<!-- Check page source to see hydrated/ssr posts  -->
	<!-- Like QueryClient the Hydrate component should be needed -->
	<!-- You can invoke useHydrate above and get hydration -->
	<Hydrate state={$dehydratedState}>
		<main class="m-2">
			<slot />
		</main>
	</Hydrate>
</QueryClient>
