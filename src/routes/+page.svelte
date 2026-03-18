<script lang="ts">
	import { archive, projects } from '$lib/constants'
	import QR from '$ui/qr.svelte'

	let { data } = $props()
</script>

<header class="relative">
	<h1>Mitchell Christ</h1>
	<p>nuotsu / XZ</p>
</header>

<main class="my-ch grid gap-ch">
	<section class="flex">
		<h2 class="text-right sideways-lr">Projects</h2>
		<ul>
			{#each projects as project}
				<li>
					<a href={project.href}>
						<span>
							{project.title}
							{#if project.year}
								<time>({project.year})</time>
							{/if}
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>

	<section class="flex">
		<h2 class="text-right sideways-lr">Archive</h2>

		<ul>
			{#each archive as item}
				<li>
					<a href={item.href}>
						<time datetime={item.date}>{item.date}</time>
					</a>
				</li>
			{/each}
		</ul>
	</section>
</main>

<footer class="grid gap-ch">
	<p>Visitors: {new Intl.NumberFormat().format(data.views)}</p>

	<QR />
</footer>

<style>
	header::before {
		content: '';
		display: block;
		height: 2ch;
		background-image: repeating-conic-gradient(currentColor 0% 25%, transparent 0% 50%);
		background-size: 2ch 100%;
	}

	a {
		display: block;

		&:hover > * {
			background-color: var(--color-foreground);
			color: var(--color-background);
		}
	}
</style>
