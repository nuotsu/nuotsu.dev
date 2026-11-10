<script lang="ts">
	import Section from '#ui/section.svelte'
	import Scramble from './scramble.svelte'

	let age_in_days = $derived(
		Math.floor((Date.now() - new Date('1995-12-04').getTime()) / (1000 * 60 * 60 * 24))
	)
</script>

<Section title="Intro" class="root grid grid-cols-2 items-start gap-ch text-pretty">
	<div class="top-ch space-y-[.5lh]">
		<h1 class="font-bold text-cp-cyan uppercase text-glow">
			<Scramble text="Mitchell Christ" trigger="hover" stagger={20} />
		</h1>

		<p class=" [&_a]:link-underline [&_a:hover]:text-cp-amber">
			Frontend Web Developer based in Irvine, California. Currently building <a
				href="https://sanitypress.dev">SanityPress</a
			>
			and an <a href="https://mlb.theohtani.com">MLB live scorebug</a>, while vibe-coding macOS
			apps.
		</p>

		<dl class="data grid grid-cols-[auto_1fr] gap-x-ch gap-y-[.25lh]">
			<dt>Alias</dt>
			<dd>nuotsu, Kazumaru, XZ</dd>

			<dt>Age</dt>
			<dd>
				{age_in_days.toLocaleString()} days ({(age_in_days / 365).toFixed(2)} years)
			</dd>

			<dt>Location</dt>
			<dd>Irvine, CA, USA, Earth</dd>
		</dl>
	</div>

	<figure
		class="bevel sticky top-ch grid aspect-square overflow-hidden bevel-br p-0 [--bevel:2lh] *:col-span-full *:row-span-full"
	>
		<enhanced:img
			class="size-full object-cover"
			src="#lib/assets/portrait.jpg"
			alt="Mitchell Christ"
			draggable="false"
			data-cursor
		/>

		<figcaption class="pointer-events-none mt-auto p-ch text-[.5em] opacity-40">
			<dl class="grid grid-cols-[auto_1fr] gap-x-ch">
				<dt>Image type:</dt>
				<dt>.JPG</dt>
				<dt>File size:</dt>
				<dt>{Number(40_336).toLocaleString()} bytes</dt>
			</dl>
		</figcaption>
	</figure>
</Section>

<style>
	@media (pointer: fine) {
		:global(.root) > div {
			position: sticky;
		}
	}

	a {
		display: inline-block;
		font-weight: bold;
	}

	.data {
		dt {
			text-align: right;
			text-transform: uppercase;
		}
		dd {
			color: var(--color-cp-cyan);
		}
	}
</style>
