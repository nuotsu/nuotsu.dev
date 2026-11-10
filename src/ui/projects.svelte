<script lang="ts">
	import { browser } from '$app/env'
	import { createLinkPreview } from '#lib/link-preview.svelte.ts'
	import LinkOutput from '#ui/link-output.svelte'
	import Scramble from '#ui/scramble.svelte'

	const PROJECTS: {
		title: string
		href: string
		year: number
		repo?: string[]
	}[] = [
		{
			title: 'SanityPress',
			href: 'https://sanitypress.dev',
			year: 2023,
			repo: ['sanitypress', 'sanitypress-2023']
		},
		{
			title: 'MLB Live Scorebug',
			href: 'https://mlb.theohtani.com',
			year: 2024,
			repo: ['mlb']
		},
		{
			title: 'Studiofront',
			href: 'https://studiofront.nuotsu.dev',
			year: 2026,
			repo: ['studiofront']
		},
		{
			title: 'Storefront',
			href: 'https://storefront.nuotsu.dev',
			year: 2026,
			repo: ['storefront-macos-menubar']
		},
		{
			title: 'CUSCO USA',
			href: 'https://cuscousainc.com',
			year: 2021
		}
	]

	const getStars = (repo: string[]) =>
		fetch(`/api/stars?repo=${repo.map(encodeURIComponent).join(',')}`)
			.then((response) => (response.ok ? response.json() : { stars: 0 }))
			.then((data: { stars: number }) => data.stars)
			.catch(() => 0)

	const entries = PROJECTS.map((project) => ({
		...project,
		stars: project.repo && browser ? getStars(project.repo) : null
	}))

	const preview = createLinkPreview()
</script>

<section class="section">
	<dl class="button-list grid grid-cols-[1fr_auto]">
		{#each entries as { title, href, year, repo, stars }}
			<div class="col-span-full grid grid-cols-subgrid">
				<a
					{href}
					class="group/project button col-span-full grid grid-cols-subgrid bevel-br p-0 text-cp-amber hover:text-cp-amber"
					{@attach preview.attach}
				>
					<div class="px-ch py-[.5ch] text-cp-cyan">
						<dt>
							<strong
								class="fade-out group-hover/project:text-cp-amber group-hover/project:duration-200 group-hover/project:text-glow"
							>
								{title}
							</strong>
						</dt>
						<dd class="text-[.75em] text-white/60">
							<time datetime={year.toString()}>{year}</time>
						</dd>
					</div>

					{#if repo}
						<dd
							class="flex items-center justify-center gap-[.5ch] bevel-br px-ch py-[.5ch] text-right group-not-hover/project:duration-800 group-hover/project:bg-cp-amber group-hover/project:text-background group-hover/project:duration-200"
						>
							{#if stars}
								{#await stars then count}
									<svg
										class="inline-block h-lh w-ch"
										width="12"
										height="16"
										viewBox="0 0 12 16"
										fill="currentColor"
										aria-hidden="true"
									>
										<path d="M6 0l1.5 6.5L12 8l-4.5 1.5L6 16l-1.5-6.5L0 8l4.5-1.5z" />
									</svg>

									<strong>
										<Scramble text={count.toString()} trigger="view" />
									</strong>
								{/await}
							{/if}
						</dd>
					{/if}
				</a>
			</div>
		{/each}
	</dl>

	<LinkOutput {preview} class="text-cp-amber" />
</section>
