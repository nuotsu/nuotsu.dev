<script lang="ts">
	import Scramble from '#ui/scramble.svelte'
	import Barcode from '#ui/barcode.svelte'
	import QR from '#ui/qr.svelte'

	let open = $state(false)
	let details: HTMLDetailsElement

	function close(e: KeyboardEvent | MouseEvent) {
		if (!open) return
		if (e instanceof KeyboardEvent ? e.key === 'Escape' : !details.contains(e.target as Node)) {
			open = false
		}
	}
</script>

<svelte:window onkeydown={close} onclick={close} />

<details class="group relative text-right" bind:open bind:this={details}>
	<summary
		class="relative flex h-lh items-start gap-[.5ch] bg-cp-red px-[.5ch] pb-[.25ch] text-background select-none"
		aria-label="QR code"
	>
		<Scramble
			class="block min-w-[12ch] text-[.5em] uppercase after:absolute after:inset-0"
			text="nuotsu.dev"
			trigger="hover"
		/>
		<Barcode class="h-[.5lh] w-auto" />
	</summary>

	<QR
		class="bevel absolute top-full right-0 z-1 mt-[.5ch] size-[20ch] min-w-max origin-top-right scale-0 bevel-tr border-sm p-lh transition-[scale] duration-200 ease-out [--bevel:1lh] group-open:scale-100 group-open:starting:scale-0"
	/>
</details>

<style>
	details::details-content {
		transition: content-visibility 0.2s allow-discrete;
	}
</style>
