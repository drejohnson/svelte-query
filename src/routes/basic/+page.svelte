<script lang="ts">
	import type { DehydratedState } from '@tanstack/query-core';
	import Post from '../_components/Post.svelte';
	import Posts from '../_components/Posts.svelte';
	import { dehydratedState } from '../_stores/hydrate.js';

	type Data = {
		dehydratedState: DehydratedState;
	};

	export let data: Data;

	dehydratedState.set(data.dehydratedState);

	let postId = -1;
	const setPostId = (id: number) => {
		postId = id;
	};
</script>

<section class="px-4">
	<h1>Basic Query</h1>
	<div class="my-4">
		{#if postId > -1}
			<Post {postId} {setPostId} />
		{:else}
			<Posts {setPostId} />
		{/if}
	</div>
</section>
