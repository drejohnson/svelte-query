<script lang="ts">
	import { useQuery } from '$lib/query/useQuery.js';

	import { default as axios, AxiosError } from 'axios';

	export let postId: number;
	export let setPostId: (id: number) => void;

	const getPostById = async (id: number) => {
		const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
		return data;
	};

	const post = useQuery<{ title: string; body: string }, AxiosError>(
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
	{#if !postId || $post.status === 'loading'}
		<span>Loading...</span>
	{:else if $post.status === 'error'}
		<span>Error: {$post.error.message}</span>
	{:else}
		<h1>{$post.data.title}</h1>
		<div>
			<p>{$post.data.body}</p>
		</div>
		<div>{$post.isFetching ? 'Background Updating...' : ' '}</div>
	{/if}
</div>
