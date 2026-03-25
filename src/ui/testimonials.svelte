<script lang="ts">
	import { testimonials } from '$lib/constants'

	let styled = $state(false)
</script>

<section id="testimonials">
	<h2>Testimonials</h2>
	<p>Real quotes by real people who have said some things about me.</p>

	<label class="select-none">
		<input type="checkbox" bind:checked={styled} />
		Enable CSS
	</label>

	{#each testimonials as { quote, author, source }}
		<figure class="group/t" class:styled>
			<blockquote class="group-not-[.styled]/t:italic">
				{#if styled}
					{#each quote.split(/(?<=[.!]) /gu) as sentence}
						<p>{@html sentence.replace('[...]', '').trim()}</p>
					{/each}
				{:else}
					<p>{@html quote}</p>
				{/if}
			</blockquote>

			<figcaption data-avatar={author.name.at(0)}>
				<cite class="not-italic group-not-[.styled]/t:before:content-['—']">
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
	@media (pointer: fine) {
		label:hover ~ figure {
			animation: pulse 1s ease-in-out forwards infinite;
		}
	}

	@media (pointer: coarse) {
		label:active ~ figure {
			animation: pulse 1s ease-in-out forwards infinite;
		}
	}

	@keyframes pulse {
		50% {
			opacity: 0.5;
		}
	}

	.styled {
		font-family: system-ui, sans-serif;
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
				background-color: light-dark(var(--quote-light), var(--quote-dark));
				transition: 0.2s ease-in-out;
				transition-property: background-color, color;
			}
		}

		&:hover p {
			background-color: light-dark(
				oklch(from var(--quote-light) calc(l * 0.95) c h),
				oklch(from var(--quote-dark) calc(l * 1.2) c h)
			);
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
				--avatar-color: light-dark(#8997c7, #41365c);
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
			}
		}
	}
</style>
