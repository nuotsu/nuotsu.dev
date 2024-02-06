<section class="my-auto grid gap-2">
	<h1
		class="font-shadow-black mr-4 rounded bg-white px-2 text-xl uppercase leading-none"
	>
		Projects
	</h1>

	<div class="flex items-center gap-1">
		<ul class="panel-yellow font-shadow-black text-lg text-black">
			{#each data.projects as project, i}
				<li class="line-clamp-1">
					<a
						class="arrow-link block rounded-md px-1 hover:bg-white"
						href="/projects/{project.id.current}"
						on:mouseover={() => onHover(project, 150)}
						on:mouseleave={() => clearTimeout(timeout)}
						on:touchstart={() => onHover(project)}
						on:touchend={() => clearTimeout(timeout)}
					>
						No{(data.projects.length - i).toString().padStart(3, '0')}
						&nbsp;
						{project.title}
					</a>
				</li>
			{/each}
		</ul>

		<aside class="panel-dex relative -order-1" bind:this={dex}>
			<div
				class="grid max-h-[3em] snap-y snap-mandatory justify-center gap-2 overflow-y-auto overflow-x-clip px-3 py-[1em] text-5xl leading-none"
			>
				{#each data.projects as project}
					<a class="snap-center" href="/projects/{project.id.current}">
						{project.emoji}
					</a>
				{/each}
			</div>
		</aside>
	</div>
</section>

<style lang="postcss">
	aside {
		&::before,
		&::after {
			content: '';
			pointer-events: none;
			position: absolute;
			z-index: 1;
			inset: -0.5px;
			height: 1.5em;
			@apply from-black/50 to-transparent;
		}

		&::before {
			@apply bottom-auto bg-gradient-to-b;
		}

		&::after {
			@apply top-auto bg-gradient-to-t;
		}
	}
</style>

<script lang="ts">
	import type { PageServerData } from './$types'

	let dex = $state<HTMLElement | null>(null)
	let timeout = $state<any>(null)

	const { data } = $props<{ data: PageServerData }>()

	function onHover(project: Sanity.Project, delay = 0) {
		timeout = setTimeout(() => {
			dex
				?.querySelector(`a[href="/projects/${project.id.current}"]`)
				?.scrollIntoView({ behavior: 'smooth', block: 'center' })

			clearTimeout(timeout)
		}, delay)
	}
</script>
