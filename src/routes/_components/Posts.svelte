<script lang="ts">
	import { useQueryClient } from '$lib/queryClientProvider/useQueryClient.js';
	import { useQuery } from '$lib/query/useQuery.js';
	import { default as axios, AxiosError } from 'axios';

	export let setPostId: (id: number) => void;

	async function getPosts() {
		const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
		return data;
	}

	const client = useQueryClient();

	const posts = useQuery<{ id: number; title: string; body: string }[], AxiosError>(
		['posts'],
		getPosts
	);
</script>

<div>
	<div>
		{#if $posts.status === 'loading'}
			<span>Loading...</span>
		{:else if $posts.status === 'error'}
			<span>Error: {$posts.error.message}</span>
		{:else}
			<ul>
				{#each $posts.data as post}
					<article class="flex items-start py-4">
						<span
							on:click={() => setPostId(post.id)}
							class={// We can use the queryCache here to show bold links for
							// ones that are cached
							client.getQueryData(['post', post.id])
								? 'text-secondary font-bold cursor-pointer'
								: 'cursor-pointer'}
						>
							{post.title}
						</span>
					</article>
				{/each}
			</ul>
			<div>{$posts.isFetching ? 'Background Updating...' : ' '}</div>
		{/if}
	</div>
</div>
