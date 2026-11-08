<script lang="ts">
	import Marquee from '$ui/marquee.svelte'
</script>

<header class="py-lh">
	<div class="ml-lh flex justify-between border-b-sm">
		<a href="/" class="flex flex-wrap items-end gap-x-ch">
			<strong class="uppercase text-glow">Mitchell Christ</strong>
			<em class="font-light">nuotsu</em>
		</a>
	</div>

	<Marquee
		class="full-bleed"
		items={['Frontend Developer', 'CSS Nerd', 'Webmaster', 'Sanity Pioneer 2026']}
	/>
</header>

<section></section>
