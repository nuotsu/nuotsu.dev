<script lang="ts">
	import './app.css'
	import Metadata from '$ui/metadata.svelte'

	let { children } = $props()
</script>

<Metadata />

<header class="flex flex-nowrap items-center justify-between gap-ch">
	<div>
		<h1>Mitchell Christ</h1>
		<p>alias: <i>nuotsu</i>, <i>kazumaru</i>, <i>XZ</i></p>
	</div>

	<!-- enhanced:img renders a <picture>, and that wrapper is the flex item -
	     the class below lands on the inner <img>, so shrink-0 has to go here -->
	<div class="shrink-0">
		<enhanced:img
			class="size-[3lh] rounded-full border border-foreground/5 object-cover"
			src="$assets/portrait.jpg"
			alt="Mitchell Christ"
			width="144"
		/>
	</div>
</header>

<main class="mt-[2lh] space-y-[2lh]">
	{@render children()}
</main>
