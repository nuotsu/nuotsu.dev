<script lang="ts">
	import Section from '#ui/section.svelte'

	const SERVICES: {
		id: string
		title: string
	}[] = [
		{ id: 'claude', title: 'Claude' },
		{ id: 'codex', title: 'Codex' },
		{ id: 'cursor', title: 'Cursor' },
		{ id: 'grokbot', title: 'Grok Bot' }
	]

	let selected = $state(SERVICES[0].id)
</script>

<Section title="Usage">
	<fieldset class="-mt-ch mb-lh flex gap-[.5ch]">
		{#each SERVICES as { id, title }}
			<label
				for="usage-{id}"
				class="relative px-[.5ch] py-ch font-bold uppercase fade-out hover:after:fade-out has-checked:text-cp-cyan! has-checked:text-glow"
			>
				<input
					id="usage-{id}"
					class="sr-only"
					name="usage"
					type="radio"
					checked={id === id}
					onchange={() => (selected = id)}
					data-cursor-disabled
				/>

				{title}
			</label>
		{/each}
	</fieldset>

	{#each SERVICES as { id, title }}
		<article class="" hidden={id !== selected}>
			{title}
		</article>
	{/each}
</Section>

<style>
	label {
		&::after {
			content: '';
			position: absolute;
			inset: 100% 0 auto;
			height: 0.25ch;
			background-color: currentColor;
			transition: box-shadow 0.2s ease-in-out;
		}

		&:has(:checked)::after {
			box-shadow: 0 -0.25ch 1ch 0.1ch currentColor;
		}
	}
</style>
