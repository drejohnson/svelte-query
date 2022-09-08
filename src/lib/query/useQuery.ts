import { QueryObserver, parseQueryArgs } from '@tanstack/query-core';
import type { QueryFunction, QueryKey } from '@tanstack/query-core';
import { useBaseQuery } from '$lib/query/useBaseQuery';
import type { DefinedUseQueryResult, UseQueryOptions, UseQueryResult } from '$lib/types';

export function useQuery<
	TQueryFnData = unknown,
	TError = unknown,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey
>(
	options: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'initialData'> & {
		initialData?: () => undefined;
	}
): UseQueryResult<TData, TError>;

export function useQuery<
	TQueryFnData = unknown,
	TError = unknown,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey
>(
	options: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'initialData'> & {
		initialData: TQueryFnData | (() => TQueryFnData);
	}
): DefinedUseQueryResult<TData, TError>;

export function useQuery<
	TQueryFnData = unknown,
	TError = unknown,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey
>(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>): UseQueryResult<TData, TError>;

export function useQuery<
	TQueryFnData = unknown,
	TError = unknown,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey
>(
	queryKey: TQueryKey,
	options?: Omit<
		UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
		'queryKey' | 'initialData'
	> & { initialData?: () => undefined }
): UseQueryResult<TData, TError>;

export function useQuery<
	TQueryFnData = unknown,
	TError = unknown,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey
>(
	queryKey: TQueryKey,
	options?: Omit<
		UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
		'queryKey' | 'initialData'
	> & { initialData: TQueryFnData | (() => TQueryFnData) }
): DefinedUseQueryResult<TData, TError>;

export function useQuery<
	TQueryFnData = unknown,
	TError = unknown,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey
>(
	queryKey: TQueryKey,
	options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey'>
): UseQueryResult<TData, TError>;

export function useQuery<
	TQueryFnData = unknown,
	TError = unknown,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey
>(
	queryKey: TQueryKey,
	queryFn: QueryFunction<TQueryFnData, TQueryKey>,
	options?: Omit<
		UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
		'queryKey' | 'queryFn' | 'initialData'
	> & { initialData?: () => undefined }
): UseQueryResult<TData, TError>;

export function useQuery<
	TQueryFnData = unknown,
	TError = unknown,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey
>(
	queryKey: TQueryKey,
	queryFn: QueryFunction<TQueryFnData, TQueryKey>,
	options?: Omit<
		UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
		'queryKey' | 'queryFn' | 'initialData'
	> & { initialData: TQueryFnData | (() => TQueryFnData) }
): DefinedUseQueryResult<TData, TError>;

export function useQuery<
	TQueryFnData = unknown,
	TError = unknown,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey
>(
	queryKey: TQueryKey,
	queryFn: QueryFunction<TQueryFnData, TQueryKey>,
	options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, TError>;

export function useQuery<
	TQueryFnData,
	TError,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey
>(
	arg1: TQueryKey | UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
	arg2?:
		| QueryFunction<TQueryFnData, TQueryKey>
		| UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
	arg3?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseQueryResult<TData, TError> {
	const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
	const result = useBaseQuery(parsedOptions, QueryObserver);
	return result;
}
