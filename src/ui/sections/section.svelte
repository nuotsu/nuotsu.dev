<script lang="ts">
	import { intersecting } from '$lib/intersection-observer'
	import SourceCode from '$ui/source-code.svelte'
	import Heading from '$ui/heading.svelte'

	let {
		id = '',
		class: className = '',
		children,
		heading = '',
		inspect = undefined as string | undefined,
	} = $props()

	let clientHeight: number = $state(0)
	let windowHeight: number = $state(0)

	let isShort = $derived(clientHeight < windowHeight)

	$effect(() => {
		windowHeight = window.innerHeight
	})

	function toggleTableOfContents(entry: IntersectionObserverEntry) {
		const target = document.querySelector(
			`#table-of-contents [href="#${entry.target.id}"]`,
		) as HTMLElement | null

		if (!target) return
		if (entry.isIntersecting) {
			target.classList.add('is-active')
		} else {
			target.classList.remove('is-active')
		}
	}
</script>

<section
	{id}
	style:--section-height="{clientHeight}px"
	class="relative max-w-6xl p-lh {isShort
		? 'md:scroll-mt-(--offset)'
		: ''} {className}"
	bind:clientHeight
	{@attach intersecting(
		{ 'data-is-intersecting': true },
		{},
		toggleTableOfContents,
	)}
>
	{#if inspect}
		<SourceCode path={inspect} />
	{/if}

	{#if heading}
		<Heading value={heading} />
	{/if}

	{@render children()}
</section>

<style>
	section {
		--offset: calc(50svh - var(--section-height, 0px) / 2);

		&:last-child {
			margin-bottom: 50svh;
		}
	}
</style>
