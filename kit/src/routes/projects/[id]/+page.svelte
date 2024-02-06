<nav class="bg-blue self-start" style:grid-column="bleed">
	<div class="content-grid">
		<a class="font-shadow-white text-xl uppercase text-white" href="/projects">
			Projects
		</a>
	</div>
</nav>

<section class="my-auto">
	<header class="panel-white-thin bg-ink-shadow grid gap-y-2">
		<figure
			class="row-span-full grid aspect-square place-content-center self-center text-7xl"
		>
			{project.emoji}
		</figure>

		<h1 class="font-shadow-black mt-auto px-2 text-2xl leading-none text-black">
			{project.title}
		</h1>

		<dl
			class="font-shadow-black grid gap-2 rounded-tl bg-white p-2 leading-none text-black"
		>
			<div class="border-ink-shadow flex justify-between gap-2 border-b-2">
				<dt>URL</dt>
				<dd>
					<a
						class="arrow-link has-arrow text-blue font-shadow-blue"
						href={project.url}
						target="_blank"
					>
						{cleanUrl}
					</a>
				</dd>
			</div>
			<div class="border-ink-shadow flex justify-between gap-2 border-b-2">
				<dt>DATE</dt>
				<dd>
					<time datetime={project.startDate}>
						{project.startDate.replaceAll('-', '.')}
					</time>
				</dd>
			</div>
		</dl>
	</header>
</section>

<style lang="postcss">
	header {
		grid-template-columns: 1fr 2fr;
		grid-template-rows: repeat(2, 1fr);
	}
</style>

<script lang="ts">
	import type { PageServerData } from './$types'

	const { data } = $props<{ data: PageServerData }>()

	const { project } = data

	const cleanUrl = project.url.replace(/(^\w+:|^)\/\//, '')
</script>
