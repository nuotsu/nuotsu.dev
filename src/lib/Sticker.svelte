<div class="w-32 rounded-full overflow-hidden mx-auto shadow-real" draggable={true}>
	<figure
		class="relative aspect-square overflow-hidden"
		style:rotate="{Math.random() * 30 - 15}deg"
	>
		<time
			class="h-full flex flex-col gap-1 justify-center bg-gold text-center"
			datetime={now.toISOString()}
		>
			<div class="self-center grid grid-cols-2 items-center bg-black text-gold leading-none">
				<span class="grayscale text-xl">🇺🇸</span>
				<b class="font-mono font-extrabold text-[8px] bg-gold text-black leading-none border-2 border-current p-1">NUO<br>TSU</b>
			</div>

			<div
				class="center flex justify-center bg-black text-gold uppercase text-2xl mt-1 leading-none whitespace-nowrap"
				class:text-xl={words.length >= 8 || words === 'twenty'}
				class:text-lg={words.length >= 9}
			>
				<b class="font-bold">{now.getHours()}</b>
				<span class="font-extralight">
					{#if now.getMinutes() < 10}
						zero
					{:else}
						{words}
					{/if}
				</span>
			</div>

			<div class="flex justify-center text-2xl">
				<b>{String(now.getMinutes()).split('').pop()}</b>
				<span>{size}</span>
			</div>
		</time>
	</figure>
</div>

<style lang="postcss">
	figure::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 100%;
		border: 6px solid;
	}

	figure::after {
		content: '';
		position: absolute;
		inset: 0 auto 0 0;
		width: 3rem;
		transition: translate .2s ease-in-out;
		mix-blend-mode: plus-lighter;
		@apply bg-gradient-to-r from-transparent via-white/20 to-transparent;
	}
	figure:hover::after {
		translate: 5rem 0;
	}

	.center {
		box-shadow:
			0 0 0 1px currentColor,
			0 0 0 3px black,
			0 0 0 4px currentColor,
			0 0 0 5px black;
	}
</style>

<script lang="ts">
	// @ts-ignore
	import n2w from 'number-to-words'

	let now = new Date()
	$: words = (n2w.toWords(now.getMinutes()) as string).split('-')[0]

	const sizes = ['', '⅛', '¼', '⅜', '½', '⅝', '¾', '⅞']
	$: size = sizes[now.getSeconds() / 60 * 8 | 0]

	setInterval(() => {
		now = new Date()
	}, 1000 * 5)
</script>
