<script lang="ts">
	import { testimonials } from '$lib/constants'
	import ToggleCss from './toggle-css.svelte'

	let styled = $state(false)
</script>

<section id="testimonials">
	<h2>Testimonials</h2>
	<p>Real quotes by real people.</p>

	<ToggleCss bind:checked={styled} />

	{#each testimonials as { quote, author, source }}
		<figure class="group/testimonials" data-css-target>
			<blockquote>
				{#if styled}
					{#each quote.split(/(?<=[.!]) /gu) as sentence}
						<p>{@html sentence.replace('[...]', '').trim()}</p>
					{/each}
				{:else}
					<p>{@html quote}</p>
				{/if}
			</blockquote>

			<figcaption data-avatar={author.name.at(0)}>
				<cite class="not-italic">
					<a href={source}>
						{author.name}
					</a>

					{#if author.title}
						<span class="inline-block before:content-['//_']">{author.title}</span>
					{/if}
				</cite>
			</figcaption>
		</figure>
	{/each}
</section>

<style>
	:global(label:not(:has(:checked))) ~ figure {
		blockquote {
			font-style: italic;
		}

		cite::before {
			content: '— ';
		}
	}

	:global(label:has(:checked)) ~ figure {
		font-family: var(--font-sans);
		margin: 0;
		display: grid;
		grid-template:
			'avatar cite' auto
			'avatar quote' auto / auto 1fr;
		align-items: end;
		gap: 0.25lh;
		margin-top: 1lh;

		blockquote {
			grid-area: quote;
			margin: 0;
			display: flex;
			flex-direction: column;
			align-items: start;
			gap: inherit;

			p {
				--quote-light: #e9e9eb;
				--quote-dark: #3b3b3d;
				margin: 0;
				padding: 0.3lh 0.8lh;
				border-radius: 1lh;
				background-color: var(--quote-light);
				transition: 0.2s ease-in-out;
				transition-property: background-color, color;

				@media (prefers-color-scheme: dark) {
					background-color: var(--quote-dark);
				}
			}
		}

		&:hover p {
			background-color: oklch(from var(--quote-light) calc(l * 0.95) c h);

			@media (prefers-color-scheme: dark) {
				background-color: oklch(from var(--quote-dark) calc(l * 1.2) c h);
			}
		}

		figcaption {
			display: contents;
			font-size: small;

			cite {
				grid-area: cite;
				order: -1;
				padding-left: 0.8rlh;
			}

			span {
				color: color-mix(in srgb, currentColor 50%, transparent);
			}

			&::before {
				--avatar-color: #8997c7;
				grid-area: avatar;
				content: attr(data-avatar);
				display: grid;
				place-content: center;
				aspect-ratio: 1;
				height: 1.6lh;
				margin-bottom: 0.2lh;
				border-radius: 100%;
				background: linear-gradient(
					to bottom,
					color-mix(in srgb, var(--avatar-color) 50%, currentColor),
					var(--avatar-color)
				);
				text-transform: uppercase;
				font-weight: bold;
				color: white;

				@media (prefers-color-scheme: dark) {
					--avatar-color: #41365c;
				}
			}
		}
	}
</style>
