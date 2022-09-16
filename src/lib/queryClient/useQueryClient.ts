import type { QueryClient } from '@tanstack/query-core';

export function useQueryClient(): QueryClient {
	let queryClient!: QueryClient;
	if (!queryClient) {
		throw new Error('No QueryClient set, use QueryClientProvider to set one');
	}
	return queryClient;
}
