import { QueryClient, QueryCache, MutationCache, type DefaultOptions } from '@tanstack/query-core';
import { readable, writable } from 'svelte/store';

// Props with default values
const queryCache = new QueryCache();
const mutationCache = new MutationCache();
const defaultOptions: DefaultOptions = {};
const client = new QueryClient({
	queryCache,
	mutationCache,
	defaultOptions
});

export const clientStore = readable<QueryClient>(client);
export const clientSharingStore = writable<boolean>(false);
