<header class="sticky top-0">
	<div
		class="flex flex-col items-start overflow-x-auto overflow-y-clip no-scrollbar"
	>
		<h1
			class="relative text-9xl leading-[1.1] whitespace-nowrap shrink-0 overflow-hidden font-cursive"
		>
			{title}
			<BaseballCap />
		</h1>

		<nav class="sticky left-0 -mt-[2ch]">
			<a href="/"> nuotsu </a>
		</nav>
	</div>
</header>

<p class="text-neutral-400 [&_a]:text-ink">
	{#if children}
		{@render children()}
	{:else}
		I generate images with
		<a href="/midjourney">Midjourney</a>, too.
	{/if}
</p>

<h2 class="text-neutral-400 mt-2">
	Welcome to
	<strong class="text-ink font-normal">Mitchell Kazumaru Christ</strong>'s
	website.
</h2>

<style>
	header {
		margin-bottom: -0.75ch;
	}

	header > div {
		padding-bottom: 2ch;
	}

	h1 {
		padding-bottom: 0.1ch;
		margin-bottom: -0.15ch;
		letter-spacing: -0.075em;
	}

	p :global(a) {
		position: relative;

		&:hover {
			font-style: italic;
		}
	}
</style>

<script lang="ts">
	import BaseballCap from '@/lib/BaseballCap.svelte'

	const {
		title = 'I make websites.',
		children,
	}: {
		title?: string
		children?: any
	} = $props()
</script>
