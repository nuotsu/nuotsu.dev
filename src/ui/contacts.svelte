<script lang="ts">
	const CONTACTS: { href: string; label: string }[] = [
		{ href: 'https://github.com/nuotsu', label: '@nuotsu' },
		{ href: 'https://github.com/mitchuman', label: '@mitchuman' },
		{ href: 'https://linkedin.com/in/nuotsu', label: 'LinkedIn' },
		{ href: 'https://x.com/marutchell', label: 'X' },
		{ href: 'mailto:mitchell@mail.grokbot.com', label: "Mitchell's Bot" }
	]

	let activeContact = $state('')
	let url = $derived(activeContact.replace(/^(https?:\/\/(www\.)?|mailto:)/, ''))
</script>

<section class=" px-lh">
	<div class="relative max-w-max">
		<ul class="grid button-list gap-[.5ch] border-b-sm pr-[2ch] pb-[.5ch]">
			{#each CONTACTS as { href, label }}
				<li>
					<a
						{href}
						class="button"
						onmouseenter={() => (activeContact = href)}
						onmouseleave={() => (activeContact = '')}
						onpointerdown={() => (activeContact = href)}
						onpointerup={() => (activeContact = '')}
					>
						<strong class="uppercase">{label}</strong>
					</a>
				</li>
			{/each}
		</ul>

		<output class="absolute top-full right-0 pt-[.25ch] text-[.75em]">{url}</output>
	</div>
</section>
