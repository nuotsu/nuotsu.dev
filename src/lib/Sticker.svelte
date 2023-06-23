<time
	class="flex flex-col gap-1 justify-center bg-gold aspect-square rounded-full overflow-hidden w-32 mx-auto text-center border-[6px] border-black"
	style:rotate="{Math.random() * 30 - 15}deg"
>
	<div class="self-center grid grid-cols-2 items-center bg-black text-gold leading-none">
		<span class="grayscale text-xl">🇺🇸</span>
		<b class="font-mono font-extrabold text-[8px] bg-gold text-black leading-none border-2 border-black p-1">NUO<br>TSU</b>
	</div>

	<div class="center flex justify-center bg-black text-gold uppercase text-2xl mt-1 leading-none whitespace-nowrap">
		<b class="font-bold">{now.getHours()}</b>
		<span class="font-extralight">{toWords(now.getMinutes()).split('-')[0]}</span>
	</div>

	<div class="flex justify-center text-2xl">
		<b>{String(now.getMinutes()).split('').pop()}</b>
		<span>{size}</span>
	</div>
</time>

<style>
	.center {
		box-shadow:
			0 0 0 1px currentColor,
			0 0 0 3px black,
			0 0 0 4px currentColor,
			0 0 0 5px black;
	}
</style>

<script>
	// @ts-ignore
	import { toWords } from 'number-to-words'

	let now = new Date()

	const sizes = ['', '⅛', '¼', '⅜', '½', '⅝', '¾', '⅞']
	$: size = sizes[now.getSeconds() / 60 * 8 | 0]

	setInterval(() => {
		now = new Date()
	}, 1000 * 5)
</script>
