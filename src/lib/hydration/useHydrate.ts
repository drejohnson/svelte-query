import {
	type DehydratedState,
	type HydrateOptions,
	type QueryClient,
	hydrate
} from '@tanstack/query-core';
import { useQueryClient } from '$lib/queryClient/useQueryClient.js';

export function useHydrate(state: DehydratedState, options?: HydrateOptions) {
	const client: QueryClient = useQueryClient();
	if (state) {
		hydrate(client, state, options);
	}
}
