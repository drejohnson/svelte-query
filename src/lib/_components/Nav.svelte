<script lang="ts">
	export let path: string;
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">SvelteQuery</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal p-0">
			<li><a href="/">Home</a></li>
			<li tabindex="0">
				<span>
					Examples
					<svg
						class="fill-current"
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg
					>
				</span>
				<ul class="p-2 bg-base-100">
					<li><a href="/simple" class:selected={path === 'simple'}>Simple</a></li>
					<li><a href="/basic" class:selected={path === 'basic'}>Basic</a></li>
					<li><a href="/infinite" class:selected={path === 'infinite'}>Infinite</a></li>
					<li><a href="/optimistic" class:selected={path === 'optimistic'}>Optimistic</a></li>
				</ul>
			</li>
		</ul>
	</div>
</div>
