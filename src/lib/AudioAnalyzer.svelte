{#if typeof navigator !== 'undefined' && ('mediaDevices' in navigator)}
	{#await navigator.mediaDevices.getUserMedia({ audio: true })}
		Getting audio permissions...

	{:then stream}
		<audio use:setStream={stream} autoplay crossorigin="anonymous" hidden />

		<slot></slot>

	{/await}
{:else}
	<p>Audio not supported</p>
{/if}

<script lang="ts">
	function setStream(node: HTMLAudioElement, stream: MediaStream) {
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
