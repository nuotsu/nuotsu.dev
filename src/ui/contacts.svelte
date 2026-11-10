<script lang="ts">
	import { createLinkPreview } from '#lib/link-preview.svelte.ts'
	import LinkOutput from '#ui/link-output.svelte'

	const CONTACTS: { href: string; label: string }[] = [
		{ href: 'https://github.com/nuotsu', label: '@nuotsu' },
		{ href: 'https://github.com/mitchuman', label: '@mitchuman' },
		{ href: 'https://linkedin.com/in/nuotsu', label: 'LinkedIn' },
		{ href: 'https://x.com/marutchell', label: 'X' },
		{ href: 'mailto:mitchell@mail.grokbot.com', label: "Mitchell's Bot" }
	]

	const preview = createLinkPreview()
</script>

<section class="section">
	<ul class="button-list">
		{#each CONTACTS as { href, label }}
			<li>
				<a {href} class="button bevel-br hover:text-glow" {@attach preview.attach}>
					<strong class="uppercase">{label}</strong>
				</a>
			</li>
		{/each}
	</ul>

	<LinkOutput {preview} />
</section>
