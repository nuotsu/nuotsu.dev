<script lang="ts">
	import './layout.css'
	import Metadata from '$ui/metadata.svelte'

	let { children } = $props()
</script>

<Metadata />

{@render children()}
