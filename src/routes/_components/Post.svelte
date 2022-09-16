<script lang="ts">
	import { useQuery } from '$lib/query/useQuery.js';

	export let postId: number;
	export let setPostId: (id: number) => void;

	const getPostById = async (id: number) =>
		await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((r) => r.json());

	const post = useQuery<{ title: string; body: string }, Error>(
		['post', postId],
		() => getPostById(postId),
		{
			enabled: !!postId
		}
	);
</script>

<div>
	<div>
		<button class="btn btn-primary" on:click={() => setPostId(-1)}> Back </button>
	</div>
	{#if !postId || $post.isLoading}
		<span>Loading...</span>
	{/if}
	{#if $post.error}
		<span>Error: {$post.error.message}</span>
	{/if}
	{#if $post.isSuccess}
		<h1>{$post.data.title}</h1>
		<div>
			<p>{$post.data.body}</p>
		</div>
		<div>{$post.isFetching ? 'Background Updating...' : ' '}</div>
	{/if}
</div>
