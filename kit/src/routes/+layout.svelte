<main class="min-h-dvh flex flex-col">
	<slot></slot>
</main>

<style>
	main {
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>

<script lang="ts">
	import { inject } from '@vercel/analytics'
	import '../styles/app.css'

	inject()
</script>
