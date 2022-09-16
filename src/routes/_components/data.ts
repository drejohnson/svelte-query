import { default as axios } from 'axios';

export type Post = { id: number; title: string; body: string };

export const limit = 10;

export async function getPosts(limit: number) {
	const parsed = await fetch('https://jsonplaceholder.typicode.com/posts').then((r) => r.json());
	const result = parsed.filter((x: Post) => x.id <= limit);
	return result;
}
