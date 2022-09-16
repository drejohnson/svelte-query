import type { LoadEvent } from '@sveltejs/kit';

export async function load({ fetch }: LoadEvent) {
	const data = fetch(`/auto-refetching.json`).then((r) => r.json());
	return data;
}
