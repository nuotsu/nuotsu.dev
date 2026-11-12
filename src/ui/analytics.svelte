<script lang="ts">
	import { browser } from '$app/env'
	import Section from '#ui/section.svelte'
	import Scramble from '#ui/scramble.svelte'

	const visitors: Promise<number | null> = browser
		? fetch('/api/visitors')
				.then((response) => (response.ok ? response.json() : { visitors: null }))
				.then((data: { visitors: number | null }) => data.visitors)
				.catch(() => null)
		: Promise.resolve(null)

	const ip: Promise<string | null> = browser
		? fetch('/api/ip')
				.then((response) => (response.ok ? response.json() : { ip: null }))
				.then((data: { ip: string | null }) => data.ip)
				.catch(() => null)
		: Promise.resolve(null)

	const lastCommit = new Date(__LAST_COMMIT_DATE__)
</script>

<Section title="Analytics" class="mr-0 ml-auto max-w-max">
	<dl class="grid grid-cols-[auto_1fr] gap-x-ch gap-y-[.25lh] [&_dd]:font-bold">
		<dt>Visitors</dt>
		<dd>
			{#await visitors then count}
				<Scramble text={count?.toLocaleString() ?? '0'} chars="0123456789" trigger="view" />
			{/await}
		</dd>

		<dt>Visitor IP</dt>
		{#await ip}
			<dd></dd>
		{:then address}
			{@const text = address ?? '?'}
			<dd>
				<Scramble {text} chars="0123456789abcdef.:" trigger="view" />
			</dd>
		{/await}

		<dt>Last commit</dt>
		<dd>
			<time datetime={__LAST_COMMIT_DATE__}>
				<Scramble
					text={lastCommit
						.toLocaleDateString('en-CA', {
							year: 'numeric',
							month: 'numeric',
							day: 'numeric'
						})
						.replaceAll('-', '.')}
					chars="0123456789."
					trigger="view"
				/>
			</time>
		</dd>
	</dl>
</Section>

<style>
	dt {
		text-align: right;
		text-transform: uppercase;
	}

	dd {
		min-width: 15ch;
	}
</style>
