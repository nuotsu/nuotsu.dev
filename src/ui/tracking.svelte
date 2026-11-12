<script lang="ts">
	import Section from '#ui/section.svelte'

	let visitor_count = $state(0)
</script>

<Section title="Tracking" class="md:w-auto">
	<dl class="grid grid-cols-[auto_1fr] gap-x-ch gap-y-[.25lh] [&_dd]:font-bold">
		<dt class="uppercase">Vistors:</dt>
		<dd>{visitor_count}</dd>
	</dl>
</Section>
