import { afterUpdate } from 'svelte';
import { readable, type Readable } from 'svelte/store';
import {
	type MutationFunction,
	type MutationKey,
	type MutationObserverResult,
	MutationObserver,
	notifyManager,
	parseMutationArgs
} from '@tanstack/query-core';
import type { UseMutateFunction, UseMutationOptions, UseMutationResult } from '$lib/types.js';
import { useQueryClient } from '$lib/queryClientProvider/useQueryClient.js';

export function useMutation<
	TData = unknown,
	TError = unknown,
	TVariables = void,
	TContext = unknown
>(
	options: UseMutationOptions<TData, TError, TVariables, TContext>
): Readable<UseMutationResult<TData, TError, TVariables, TContext>>;

export function useMutation<
	TData = unknown,
	TError = unknown,
	TVariables = void,
	TContext = unknown
>(
	mutationFn: MutationFunction<TData, TVariables>,
	options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>
): Readable<UseMutationResult<TData, TError, TVariables, TContext>>;

export function useMutation<
	TData = unknown,
	TError = unknown,
	TVariables = void,
	TContext = unknown
>(
	mutationKey: MutationKey,
	options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationKey'>
): Readable<UseMutationResult<TData, TError, TVariables, TContext>>;

export function useMutation<
	TData = unknown,
	TError = unknown,
	TVariables = void,
	TContext = unknown
>(
	mutationKey: MutationKey,
	mutationFn?: MutationFunction<TData, TVariables>,
	options?: Omit<
		UseMutationResult<TData, TError, TVariables, TContext>,
		'mutationKey' | 'mutationFn'
	>
): Readable<UseMutationResult<TData, TError, TVariables, TContext>>;

export function useMutation<
	TData = unknown,
	TError = unknown,
	TVariables = void,
	TContext = unknown
>(
	arg1:
		| MutationKey
		| MutationFunction<TData, TVariables>
		| UseMutationOptions<TData, TError, TVariables, TContext>,
	arg2?:
		| MutationFunction<TData, TVariables>
		| UseMutationOptions<TData, TError, TVariables, TContext>,
	arg3?: UseMutationOptions<TData, TError, TVariables, TContext>
): Readable<UseMutationResult<TData, TError, TVariables, TContext>> {
	const options = parseMutationArgs(arg1, arg2, arg3);
	const queryClient = useQueryClient();
	const observer = new MutationObserver(queryClient, options);

	const mutate: UseMutateFunction<TData, TError, TVariables, TContext> = (
		variables,
		mutateOptions
	) => {
		observer.mutate(variables, mutateOptions).catch(noop);
	};
	const initialResult = observer.getCurrentResult();
	const initialMutationResult: UseMutationResult<TData, TError, TVariables, TContext> = {
		...initialResult,
		mutate,
		mutateAsync: initialResult.mutate
	};

	const { subscribe } = readable(initialMutationResult, (set) => {
		return observer.subscribe(
			notifyManager.batchCalls(
				(result: MutationObserverResult<TData, TError, TVariables, TContext>) => {
					// Check if the component is still mounted
					if (observer.hasListeners()) {
						set({ ...result, mutate, mutateAsync: result.mutate });
					}
				}
			)
		);
	});

	afterUpdate(() => {
		observer.setOptions(options);
	});

	return { subscribe };
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}
