import { QueryObserver, notifyManager } from '@tanstack/query-core';
import type { QueryKey } from '@tanstack/query-core';
import type { UseBaseQueryOptions } from '$lib/types';
import { useQueryClient } from '$lib/queryClientProvider/useQueryClient';
import { afterUpdate } from 'svelte';
import { readable } from 'svelte/store';

export function useBaseQuery<TQueryFnData, TError, TData, TQueryData, TQueryKey extends QueryKey>(
	options: UseBaseQueryOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>,
	Observer: typeof QueryObserver
) {
	const queryClient = useQueryClient();
	let defaultedOptions = queryClient.defaultQueryOptions(options);
	defaultedOptions._optimisticResults = 'optimistic';

	const observer = new Observer<TQueryFnData, TError, TData, TQueryData, TQueryKey>(
		queryClient,
		defaultedOptions
	);

	const { subscribe } = readable(observer.getCurrentResult(), (set) => {
		return observer.subscribe(notifyManager.batchCalls(set));
	});

	observer.updateResult();

	afterUpdate(() => {
		observer.setOptions(defaultedOptions, { listeners: false });
	});

	return {
		subscribe
	};
}
