<script lang="ts">
	import { projects } from '$lib/db/projects'
	import { testimonials } from '$lib/db/testimonials'
	import { writings } from '$lib/db/writings'

	async function getStars(repo: string[]) {
		const response = await fetch(`/api/stars?repo=${repo.join(',')}`)
		const data = await response.json()
		return data.stars
	}
</script>

<section class="space-y-ch">
	<h2>About</h2>
	<p>
		Frontend Web Developer based in Irvine, California. Currently building <a
			href="https://sanitypress.dev">SanityPress</a
		>
		and an
		<a href="https://mlb.theohtani.com">MLB live scorebug</a>.
	</p>
</section>

<section class="space-y-ch">
	<h2>Projects</h2>
	<ul>
		{#each projects as project}
			<li class="relative flex items-center gap-ch">
				<a
					class="line-clamp-1 grow before:absolute before:inset-0"
					href={project.url}
				>
					{project.title}
				</a>

				{#if project.repo}
					{#await getStars(project.repo)}
						<loading></loading>
					{:then stars}
						{stars} stars
					{/await}
				{/if}
			</li>
		{/each}
	</ul>
</section>

<section class="space-y-ch">
	<h2>Writing</h2>
	<ul class="space-y-[.5lh] leading-tight text-pretty">
		{#each writings as writing}
			<li class="relative flex items-start gap-ch">
				<a class="grow before:absolute before:inset-0" href={writing.href}
					>{writing.title}</a
				>
				<time class="tabular-nums" datetime={writing.date}>{writing.date}</time>
			</li>
		{/each}
	</ul>
</section>

<section class="space-y-ch">
	<h2>Testimonials</h2>
	<div class="space-y-[.75lh]">
	{#each testimonials as testimonial}
		<figure
			class="relative flex flex-col gap-[2px] [&_a]:before:absolute [&_a]:before:inset-0"
		>
			<cite class="text-[smaller] not-italic pl-[1.5rch]">
				<b class="text-foreground">{testimonial.author.name}</b>,
				{testimonial.author.title}
			</cite>

			<blockquote class="flex flex-col items-start gap-[3px] [&_strong]:font-normal [&_strong]:text-foreground text-pretty">
				{const sentences = testimonial.quote.split('\n')}
				{#each sentences as sentence, i}
					<p class="rounded-[.75lh] bg-foreground/7 px-[1.5ch] py-[.5ch]">{@html sentence}</p>
				{/each}
			</blockquote>
		</figure>
	{/each}
</div>
</section>

<section class="space-y-ch">
	<h2>Contact</h2>
	<ul>
		<li>
			GitHub: <a href="https://github.com/nuotsu"> Personal</a> |
			<a href="https://github.com/mitchuman">Work</a>
		</li>
		<li>
			<a href="https://x.com/marutchell">X</a>
		</li>
		<li>
			<a href="https://linkedin.com/in/nuotsu">LinkedIn</a>
		</li>
	</ul>
</section>
