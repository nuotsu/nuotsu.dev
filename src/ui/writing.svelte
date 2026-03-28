<script lang="ts">
	import { writing } from '$lib/constants'
	import ToggleCSS from './toggle-css.svelte'

	let styled = $state(false)
</script>

<section id="writing">
	<h2>Writing</h2>
	<p>
		I don't write much, but when I do, it's usually about niche web dev topics. By yours truly
		<del>and the help of AI</del>.
	</p>

	<ToggleCSS bind:checked={styled} />

	<ul data-css-target>
		{#each writing as { href, title }, i}
			<li style:--index={i} style:--rotate={styled ? `${Math.random() * 10 - 5}deg` : undefined}>
				<a {href}>{title}</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	:global(label:has(:checked)) ~ ul {
		box-sizing: border-box;
		list-style: none;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: min(24ch, 80vw);
		gap: 2ch;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		padding: 3ch 2ch 4ch;
		mask-image: linear-gradient(to right, black, black calc(100% - 4ch), transparent);
		font-family: var(--font-sans);
		text-wrap: pretty;

		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}

		@media (width < 48rem) {
			width: 100vw;
			margin-inline: calc(50% - 50vw);
		}

		li {
			scroll-snap-align: start;
			position: sticky;
			left: calc(var(--index) * 2ch);
			display: flex;
			flex-direction: column;
			justify-content: end;
			padding: 1ch;
			border: 1px solid;
			background-color: Canvas;
			min-height: 8lh;
			rotate: var(--rotate);
			box-shadow: -0.5ch 0.5ch 2ch color-mix(in srgb, CanvasText 25%, transparent);

			@media (prefers-color-scheme: dark) {
				box-shadow: -1ch 0.5ch 2ch color-mix(in srgb, Canvas 50%, transparent);
			}

			a {
				text-decoration: none;
			}
		}
	}
</style>
