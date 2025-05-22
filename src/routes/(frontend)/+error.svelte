<script lang="ts">
	import { page } from '$app/state'
</script>

<aside class="text-bg fixed inset-0 bg-[blue] p-[1ch]">
	<h1 class="font-bold">{page.status}</h1>
	<p>{page.error?.message}</p>
	<nav><a href="/">Return home</a></nav>
</aside>

<style>
	a {
		color: inherit;
	}
</style>
