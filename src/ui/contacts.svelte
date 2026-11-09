<script lang="ts">
	const CONTACTS: { href: string; label: string }[] = [
		{ href: 'https://github.com/nuotsu', label: '@nuotsu' },
		{ href: 'https://github.com/mitchuman', label: '@mitchuman' },
		{ href: 'https://linkedin.com/in/nuotsu', label: 'LinkedIn' },
		{ href: 'https://x.com/marutchell', label: 'X' },
		{ href: 'mailto:mitchell@mail.grokbot.com', label: "Mitchell's Bot" }
	]

	let active = $state('')
	let url = $derived(active.replace(/^(https?:\/\/(www\.)?|mailto:)/, ''))
</script>

<section class="section">
	<div class="relative max-w-max">
		<ul class="mb-lh grid button-list gap-[.5ch] pr-[2ch] pb-[.5ch]">
			{#each CONTACTS as { href, label }}
				<li>
					<a
						{href}
						class="button"
						onmouseenter={() => (active = href)}
						onmouseleave={() => (active = '')}
						onpointerdown={() => (active = href)}
						onpointerup={() => (active = '')}
					>
						<strong class="uppercase">{label}</strong>
					</a>
				</li>
			{/each}
		</ul>

		<output
			class="absolute top-full right-0 line-clamp-1 h-lh w-full border-t-sm pt-[.25ch] text-right text-[.75em] break-all"
			>{url}</output
		>
	</div>
</section>
