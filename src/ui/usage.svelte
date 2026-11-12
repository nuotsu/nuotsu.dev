<script lang="ts">
	import { browser } from '$app/env'
	import Section from '#ui/section.svelte'
	import Scramble from '#ui/scramble.svelte'
	import type { Usage } from '#lib/server/usage.ts'
	import { cn } from '#lib/utils.ts'

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

	const usage: Promise<Partial<Usage>> = browser
		? fetch('/api/usage')
				.then((response) => (response.ok ? response.json() : {}))
				.catch(() => ({}))
		: Promise.resolve({})
</script>

<Section title="Usage">
	<fieldset class="-mt-ch mb-lh flex gap-[.5ch] text-center">
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
					checked={id === selected}
					onchange={() => (selected = id)}
					data-cursor-disabled
				/>

				{title}
			</label>
		{/each}
	</fieldset>

	{#each SERVICES as { id }}
		<article class="space-y-[.5ch] text-cp-amber" hidden={id !== selected}>
			{#await usage}
				{@render bars(0)}
			{:then data}
				{@const used = data[id as keyof Usage] ?? 0}
				{@render bars(used, true)}
			{/await}

			<p class="text-[.5em] text-current/30">Token usage for the curent session</p>
		</article>
	{/each}
</Section>

{#snippet bars(used: number, live: boolean = false)}
	<div class="flex items-center gap-[.25ch] *:duration-1000">
		<small
			class={cn(
				'block text-center font-bold uppercase transition-opacity [writing-mode:sideways-lr] starting:opacity-0',
				!live && 'opacity-0'
			)}
		>
			<span class="animate-pulse">Live</span>
		</small>

		<div
			class={cn(
				'bevel inline-flex items-center bevel-br p-[.5ch] transition-colors starting:border-current/20',
				!live && 'border-current/20',
				used >= 100 && 'text-cp-red'
			)}
		>
			<div class=" flex gap-[.5ch]">
				{#each Array(10) as _, i}
					<div
						class={cn(
							'h-lh w-[.5ch] transition-[background-color,box-shadow] duration-1000 starting:bg-current/10 starting:shadow-none',
							i < used / 10
								? 'bg-current shadow-[0_0_1ch_.25ch] shadow-current/50 '
								: 'bg-current/10'
						)}
					></div>
				{/each}
			</div>

			<strong class="text-right">
				{#key selected}
					<Scramble text={used.toString()} chars="0123456789" class="inline-block w-[3ch]" />
				{/key}%
			</strong>
		</div>
	</div>
{/snippet}

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
