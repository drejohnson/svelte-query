import { QueryObserver, notifyManager } from '@tanstack/query-core';
import type { QueryKey } from '@tanstack/query-core';
import type { UseBaseQueryOptions } from '$lib/types.js';
import { useQueryClient } from '$lib/queryClient/useQueryClient.js';
import { derived, readable } from 'svelte/store';

export function useBaseQuery<TQueryFnData, TError, TData, TQueryData, TQueryKey extends QueryKey>(
	options: UseBaseQueryOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>,
	Observer: typeof QueryObserver
) {
	const queryClient = useQueryClient();
	let defaultedOptions = queryClient.defaultQueryOptions(options);
	defaultedOptions._optimisticResults = 'optimistic';

	let observer = new Observer<TQueryFnData, TError, TData, TQueryData, TQueryKey>(
		queryClient,
		defaultedOptions
	);

	// Include callbacks in batch renders
	if (defaultedOptions.onError) {
		defaultedOptions.onError = notifyManager.batchCalls(defaultedOptions.onError);
	}

	if (defaultedOptions.onSuccess) {
		defaultedOptions.onSuccess = notifyManager.batchCalls(defaultedOptions.onSuccess);
	}

	if (defaultedOptions.onSettled) {
		defaultedOptions.onSettled = notifyManager.batchCalls(defaultedOptions.onSettled);
	}

	readable(observer).subscribe(($observer) => {
		observer = $observer;
		// Do not notify on updates because of changes in the options because
		// these changes should already be reflected in the optimistic result.
		observer.setOptions(defaultedOptions, { listeners: false });
	});

	const result = readable(observer.getCurrentResult(), (set) => {
		return observer.subscribe(notifyManager.batchCalls(set));
	});

	const { subscribe } = derived(result, ($result) => {
		$result = observer.getOptimisticResult(defaultedOptions);
		return !defaultedOptions.notifyOnChangeProps ? observer.trackResult($result) : $result;
	});

	return { subscribe };
}
