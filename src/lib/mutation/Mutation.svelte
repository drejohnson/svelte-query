<script lang="ts">
	import type { MutationFunction } from '@tanstack/query-core';

	import type { UseMutationOptions, UseMutationResult } from '$lib/types.js';
	import { useMutation } from './useMutation.js';

	export let mutationFn: MutationFunction;
	export let options: UseMutationOptions | undefined = undefined;

	const mutation = useMutation(mutationFn, options);
	$: mutationResult = $mutation;
</script>

<slot name="mutation" {mutationResult} />
