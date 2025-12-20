<script lang="ts">
	import { intersecting } from '$lib/intersection-observer'
</script>

<footer
	id="footer"
	class="relative text-white"
	{@attach intersecting({ 'data-is-intersecting': true }, { threshold: 0.5 })}
>
	<enhanced:img
		class="h-lvh w-full bg-foreground-subdued object-cover text-transparent"
		src="$assets/developer.png"
		alt={'young medieval knights templar wearing a white baseball jersey with blue lettering "Developers" and the red number "17" typing on a Macbook, Renaissance oil painting'}
		draggable={false}
		loading="eager"
		fetchpriority="high"
	/>

	<a
		class="absolute right-0 bottom-0 z-1 p-ch text-center text-xs text-balance transition-opacity not-hover:opacity-40 max-md:left-0 md:max-w-(--toc-width) md:text-right"
		href="https://www.shopify.com/editions/winter2026"
	>
		This site is heavily inspired by the Shopify Editions Winter '26.
	</a>
</footer>

<style>
	footer :global(img) {
		height: calc(100lvh + 1px);
	}

	a {
		padding-bottom: max(1ch, env(safe-area-inset-bottom));
	}
</style>
