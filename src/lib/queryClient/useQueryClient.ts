import type { QueryClient } from '@tanstack/query-core';
import { getQueryClientContext } from '$lib/context.js';

export function useQueryClient(): QueryClient {
	const queryClient = getQueryClientContext();

	if (!queryClient) {
		throw new Error('No QueryClient set, use QueryClient component to set one');
	}
	return queryClient;
}
