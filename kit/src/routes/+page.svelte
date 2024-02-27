<article class="mx-auto max-w-xl">
	<header class="p-2">
		<h1><T text={text[0][0]} hideCursor="afterEnd" /></h1>
		<h2>
			<T text={text[0][1]} delay={total(text[0][0])} hideCursor="beforeStart" />
		</h2>
	</header>

	<Section text={text[1] as string} delay={total(text[0])}>
		<ul>
			{#each skills as skill, i}
				<li class="before:invisible before:content-['▶']">
					<T
						text={skill}
						delay={total(text[0], text[1], i)}
						hideCursor={['beforeStart', 'afterEnd']}
					/>
				</li>
			{/each}

			<li>
				<a
					href="https://www.credly.com/badges/714964a0-6bbb-4da8-9c02-e91b005fc967/linked_in_profile"
					target="_blank"
				>
					<T
						text="Shopify Certified*"
						delay={total(text[0], text[1], skills.length)}
						hideCursor={['beforeStart', 'afterEnd']}
					/>
				</a>
			</li>
		</ul>
	</Section>

	<Section text={text[2] as string} delay={total(text[0])}>
		<ul>
			{#each $page.data.projects as project, i}
				<li>
					<a class="flex justify-between whitespace-nowrap" href={project.url}
						><span class="line-clamp-1 block grow text-ellipsis">
							<T
								text={project.title}
								delay={total(text[0], text[2], i)}
								hideCursor={['beforeStart', 'afterEnd']}
							/>
						</span>

						<time class="tabular-nums" datetime={project.startDate}>
							<T
								text={project.startDate}
								delay={total(text[0], text[2], i)}
								hideCursor={['beforeStart', 'afterEnd']}
							/>
						</time>
					</a>
				</li>
			{/each}
		</ul>
	</Section>

	<Section text={text[3] as string} delay={total(text[0])}>
		<ul>
			{#each links as link, i}
				<li>
					<a
						href={link.url}
						target={link.url.startsWith('http') ? '_blank' : null}
					>
						<T
							text={link.title}
							delay={total(text[0], text[3], i)}
							hideCursor={['beforeStart', 'afterEnd']}
						/>
					</a>
				</li>
			{/each}
		</ul>
	</Section>
</article>

<style>
	article {
		text-shadow: 0 0 10px currentColor;
	}

	a::before {
		content: '▶';
	}

	a:not(:hover)::before {
		visibility: hidden;
	}
</style>

<script lang="ts">
	import T from '$lib/Typewriter.svelte'
	import Section from '$lib/Section.svelte'
	import { page } from '$app/stores'

	const skills = [
		'Next.js',
		'SvelteKit',
		'TypeScript',
		'Tailwind CSS',
		'Sanity.io',
		'Midjourney',
	]

	const text = [
		['nuotsu / Mitchell Kazumaru Christ', 'Web Dev && Midjourney'],
		'Skills',
		'Projects',
		'External',
	]

	const links = [
		{ title: 'GitHub', url: 'https://github.com/nuotsu' },
		{ title: 'LinkedIn', url: 'https://linkedin.com/in/nuotsu' },
		{ title: 'Email', url: 'mailto:mitchell@nuotsu.dev' },
	]

	function total(...args: Array<string | string[] | number>) {
		return [...args].reduce((a: number, c): number => {
			if (typeof c === 'string') return a + c.length
			if (Array.isArray(c)) return a + total(...c)
			return a + c
		}, 0)
	}
</script>
