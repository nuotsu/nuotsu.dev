<script lang="ts">
	import { projects } from '$lib/constants/projects'

	async function fetchGithub(repo: string) {
		const res = await fetch(`/api/github?repo=${repo}`)
		return res.json()
	}
</script>

<section id="projects">
	<h2>Projects</h2>
	<p>Some of my notable works.</p>

	<fieldset class="flex flex-wrap gap-x-ch">
		<label>
			<input name="projects" type="radio" checked />
			Personal projects
		</label>

		<dl class="pl-[2.5em]">
			{#each projects.filter((p) => !p.client) as { title, href, year, repo, featured }}
				<dt class="list-item list-disc">
					<a {href}>
						{title}
					</a>
				</dt>
				{#if year}
					<dd>
						<time datetime={year.toString()}>{year}</time>
						{#if repo}
							{#await fetchGithub(repo) then { stars, forks }}
								<span class="transition-opacity starting:opacity-0">
									; {stars} stars, {forks} forks
								</span>
							{/await}
						{/if}
					</dd>
				{/if}
			{/each}
		</dl>

		<label>
			<input name="projects" type="radio" />
			Client websites
		</label>

		<ul>
			{#each projects.filter((p) => p.client) as { title, href }}
				<li>
					<a {href}>{title}</a>
				</li>
			{/each}
		</ul>
	</fieldset>
</section>

<style>
	label {
		order: -1;

		&:not(:has(:checked)) + * {
			display: none;
		}
	}

	label + * {
		width: 100%;
	}
</style>
