<script lang="ts">
	import { useQueryClient } from '$lib/queryClient/useQueryClient.js';
	import { useQuery } from '$lib/query/useQuery.js';
	import { getPosts, limit } from './data.js';

	export let setPostId: (id: number) => void;

	const client = useQueryClient();

	const posts = useQuery<{ id: number; title: string; body: string }[], Error>(
		['posts', limit],
		() => getPosts(limit)
	);
</script>

<div>
	<div>
		{#if $posts.isLoading}
			<span>Loading...</span>
		{/if}
		{#if $posts.error}
			<span>Error: {$posts.error.message}</span>
		{/if}
		{#if $posts.isSuccess}
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
