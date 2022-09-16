import { dehydrate, QueryClient } from '@tanstack/query-core';
import { getPosts, limit } from '../_components/data.js';

/** @type {import('./$types').LayoutLoad} */
export async function load() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(['posts', limit], () => getPosts(limit));
	return {
		dehydratedState: dehydrate(queryClient)
	};
}
