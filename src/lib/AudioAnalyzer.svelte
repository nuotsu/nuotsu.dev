<figure class="relative">
	{#if typeof navigator !== 'undefined' && ('mediaDevices' in navigator)}
		{#if !autoRequest && !stream?.active}
			<button class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" on:click={() => requesting = true}>
				Start visualizer
			</button>
		{/if}

		{#await requestAudio()}
			Requesting audio permissions...
		{:then}
			<audio use:setStream autoplay muted crossorigin="anonymous" hidden />
			<slot></slot>
		{/await}
	{:else}
		<slot name="unsupported"></slot>
	{/if}
</figure>

<script lang="ts">
	export let autoRequest = false

	$: requesting = autoRequest

	let stream: MediaStream | null = null

	$: requestAudio = async () => {
		if (!requesting) return
		stream = await navigator.mediaDevices.getUserMedia({ audio: true })
	}

	function setStream(node: HTMLAudioElement) {
		if (!node || !stream) return

		node.srcObject = stream

		let audioCtx = new AudioContext()

		$analyzer = audioCtx.createAnalyser()
		$analyzer.connect(audioCtx.destination)

		audioCtx
			.createMediaStreamSource(stream)
			.connect($analyzer)

		return {
			update(newStream: MediaStream) {
				if (node.srcObject !== newStream) {
					node.srcObject = newStream
				}
			},
			destroy() {
				node.srcObject = null
			},
		}
	}
</script>

<script context="module" lang="ts">
	import { writable } from 'svelte/store'

	export const analyzer = writable<AnalyserNode | null>(null)
</script>
