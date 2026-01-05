<script lang="ts">
	import Archive from '$ui/sections/archive.svelte'
	import Contact from '$ui/sections/contact.svelte'
	import Featured from '$ui/sections/featured.svelte'
	import Hello from '$ui/sections/hello/section.svelte'
	import Projects from '$ui/sections/projects.svelte'
	import Testimonials from '$ui/sections/testimonials.svelte'
	import Writing from '$ui/sections/writing.svelte'
</script>

{@render divider()}
<Hello />
{@render divider()}
<Featured />
<Projects />
<Archive />
{@render divider()}
<Writing />
{@render divider()}
<Testimonials />
{@render divider()}
<Contact />

{@render divider()}

{#snippet divider()}
	<div class="h-lh"></div>
{/snippet}

<style>
	div {
		--color: color-mix(in srgb, currentColor 25%, transparent);
		background: left / 1lh calc(2lh - 3.5px)
			repeating-linear-gradient(
				135deg,
				transparent,
				transparent 1lh,
				var(--color) 1lh,
				var(--color) calc(1lh + 0.5px)
			);
	}
</style>
