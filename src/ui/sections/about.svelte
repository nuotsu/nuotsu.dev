<script lang="ts">
	import Section from './section.svelte'

	const dob = '1995-12-04'
	const age = new Date().getFullYear() - new Date(dob).getFullYear()
</script>

<Section id="about" class="prose">
	<h2 class="manuscript h1">About</h2>

	<dl
		class="grid grid-cols-[auto_1fr] items-baseline gap-x-lh gap-y-2 leading-tight"
	>
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

	<p>
		Outside of writing beautiful code, I enjoy watching baseball, playing
		[pickleball, tennis, golf], and driving <a
			href="https://www.instagram.com/24and95">my Supra</a
		>.
	</p>
</Section>

<style>
	dt {
		color: var(--color-foreground-subdued);
	}
</style>
