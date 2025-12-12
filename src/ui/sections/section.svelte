<script lang="ts">
	let { id = '', class: className = '', children } = $props()

	let clientHeight: number = $state(0)
	let windowHeight: number = $state(0)

	let isShort = $derived(clientHeight < windowHeight)

	$effect(() => {
		windowHeight = window.innerHeight
	})
</script>

<section
	{id}
	style:--section-height="{clientHeight}px"
	class="p-lh {isShort ? 'md:scroll-mt-(--offset)' : ''} {className}"
	bind:clientHeight
>
	{@render children()}
</section>

<style>
	section {
		--offset: calc(50svh - var(--section-height, 0px) / 2);

		&:not(:last-child) {
			margin-bottom: calc(100svh - 2lh);
		}

		&:last-child {
			min-height: 100svh;
		}
	}
</style>
