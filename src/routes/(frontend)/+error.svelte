<script lang="ts">
	import { page } from '$app/state'
</script>

<div class="p-lh prose h-full bg-[blue] text-white">
	<p>{':('}</p>

	<hgroup>
		<h1>{page.status}</h1>
		<p>{page.error?.message}</p>
	</hgroup>

	<nav>
		<a href="/">Return home</a>
	</nav>
</div>
