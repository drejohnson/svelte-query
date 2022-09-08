import { getContext } from 'svelte';
import type { QueryClient } from '@tanstack/query-core';

export function useQueryClient(): QueryClient {
	const queryClient: QueryClient = getContext('queryClient');
	if (!queryClient) {
		throw new Error('No QueryClient set, use QueryClientProvider to set one');
	}
	return queryClient;
}
