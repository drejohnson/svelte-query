<script lang="ts">
	import Posts from './Posts.svelte';
	import Post from './Post.svelte';

	let postId = -1;
	const setPostId = (id: number) => {
		postId = id;
	};
</script>

{#if postId > -1}
	<Post {postId} {setPostId} />
{:else}
	<Posts {setPostId} />
{/if}
