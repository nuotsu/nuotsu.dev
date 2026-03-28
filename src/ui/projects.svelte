<script lang="ts">
	import { projects } from '$lib/constants/projects'
	import { count } from '$lib/utils'

	async function fetchGithub(repo: string) {
		const res = await fetch(`/api/github?repo=${repo}`)
		return res.json()
	}
</script>

<section id="projects">
	<h2>Projects</h2>

	<fieldset class="flex flex-wrap gap-x-ch">
		<legend>Some of my notable works:</legend>

		<label>
			<input name="projects" type="radio" checked />
			Personal side quests
		</label>

		<dl class="pl-[2.5em]">
			{#each projects.filter((p) => !p.client) as { title, href, year, repo }}
				<div class="flex flex-wrap items-center gap-ch not-hover:transition-opacity">
					<dt class="list-item list-disc">
						<a {href}>
							{title}
						</a>

						{#if year}
							<time datetime={year.toString()}>({year})</time>
						{/if}
					</dt>

					{#if repo}
						{#await fetchGithub(repo) then { stars, forks }}
							{#if stars || forks}
								<dd class="order-last m-0 shrink-0 transition-opacity starting:opacity-0">
									{[stars && count(stars, 'star'), forks && count(forks, 'fork')]
										.filter(Boolean)
										.join(', ')}
								</dd>
							{/if}
						{/await}
					{/if}
				</div>
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

		& + * {
			width: 100%;
		}
	}

	dl {
		& > div:has(dd)::before {
			content: '';
			order: 1;
			flex-grow: 1;
			border-bottom: 1px dotted;
			transition: opacity var(--default-transition-duration) ease-in-out;

			@starting-style {
				opacity: 0;
			}
		}

		&:has(:hover) > div:not(:hover) {
			opacity: 0.5;
		}
	}
</style>
