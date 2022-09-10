<img src="./docs/src/images/svelte-query-og.png" />

Hooks for managing, caching and syncing asynchronous and remote data in Svelte

## Visit [sveltequery.vercel.app](https://sveltequery.vercel.app) for docs, guides, API and more!

## Quick Features

- Transport/protocol/backend agnostic data fetching (REST, GraphQL, promises, whatever!)
- Auto Caching + Refetching (stale-while-revalidate, Window Refocus, Polling/Realtime)
- Parallel + Dependent Queries
- Mutations + Reactive Query Refetching
- Multi-layer Cache + Automatic Garbage Collection
- Paginated + Cursor-based Queries
- Load-More + Infinite Scroll Queries w/ Scroll Recovery
- Request Cancellation


## Contributing

**PRs are welcome!**
You noticed a bug, a possible improvement or whatever?
Any help is always appreciated, so don't hesitate opening one!

Be sure to check out the [contributing guidelines](CONTRIBUTING.md) to fasten up the merging process.

**Get started (Devs)**

```bash
git clone ...
cd svelte-query
npm/pnpm install
```

**Running Storybook (Not Updated)**

```bash
cd storybook
yarn
yarn start
```

**Running the tests (Not Updated)**

```bash
yarn test
```

**Running the Examples**

```bash
npm run dev or pnpm dev
```
http://localhost:5173

**Build Package**

```bash
npm run build or pnpm build
```
Package is install in package directory

**Test Package Locally**

Afer building package...
```bash
cd package
npm pack
yarn start
```
Install generated package... 
```bash
npm/pnpm install ./from/location/sveltestack-svelte-query-2.0.0-alpha.01.tgz
``` 