<script lang="ts">
	import type { MutationFunction } from '@tanstack/query-core';
	import type { UseMutationOptions, UseMutationResult } from '$lib/types.js';
	import { useMutation } from './useMutation.js';

	type TData = $$Generic<any>;
	type TError = $$Generic<any>;
	type TVariables = $$Generic<any>;
	type TContext = $$Generic<any>;

	export let mutationFn: MutationFunction<TData, TVariables>;
	export let options: UseMutationOptions<TData, TError, TVariables, TContext> | undefined =
		undefined;
	export let mutationResult: UseMutationResult<TData, TError, TVariables, TContext> | undefined =
		undefined;

	const mutation = useMutation(mutationFn, options);
	$: mutationResult = $mutation;
</script>

<slot name="mutation" {mutationResult} />
