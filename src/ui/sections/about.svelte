<script lang="ts">
	import Section from './section.svelte'
	import Face from '$ui/face.svelte'

	const dob = '1995-12-04'
	const age = new Date().getFullYear() - new Date(dob).getFullYear()
</script>

<Section
	id="about"
	heading="About"
	class="space-y-rlh"
	inspect="src/ui/sections/about.svelte"
>
	<dl class="leading-tight [&_dt]:text-foreground-subdued">
		<dt>Name</dt>
		<dd>Mitchell <ruby>Kazumaru<rt lang="ja">和丸</rt></ruby> Christ</dd>

		<dt>Born</dt>
		<dd class="*:inline-block">
			<time datetime={dob}>Dec 4<sup>th</sup>, 1995</time>
			<span>@ Tokyo, Japan</span>
			<small class="opacity-50">(Age: {age})</small>
		</dd>

		<dt>Residence</dt>
		<dd>Irvine, California</dd>
	</dl>

	<article class="max-w-xl prose">
		<p>
			Outside of crafting beautiful websites, I enjoy watching baseball, playing
			[pickleball, tennis, golf], and driving
			<a class="link" href="https://www.instagram.com/24and95">my Supra</a>.
		</p>
	</article>

	<article class="face md:animation-[move_ease-in-out] overflow-x-clip">
		<Face />
	</article>
</Section>

<style>
	.face :global(figure) {
		animation-timeline: view();
	}

	@keyframes move {
		0% {
			translate: 50vw 4lh;
		}

		50% {
			translate: 0 0;
		}
	}
</style>
