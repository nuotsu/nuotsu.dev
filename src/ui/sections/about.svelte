<script lang="ts">
	import Section from './section.svelte'
	import Face from '$ui/face.svelte'

	const dob = '1995-12-04'
	const age = new Date().getFullYear() - new Date(dob).getFullYear()

	const years = new Date().getFullYear() - new Date('2018-05-31').getFullYear()
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
			I'm a frontend web developer with over {years} years of crafting digital experiences.
			I current work for a digital marketing agency in Southern California, helping
			brands grow their online presence.
		</p>
		<p>
			I value scalability and maintainability in my work. I'm an advocate for
			using native web platform. <em>The Web is King.</em>
		</p>
		<p>
			My dream is to <em
				>make the world a better place, one great website at a time.</em
			>
		</p>
		<p>
			Outside of writing code, I enjoy watching baseball, playing [pickleball,
			tennis, golf], generating surreal visuals on Midjourney to spark
			creativity, and driving
			<a class="link" href="https://www.instagram.com/24and95">my Supra</a>.
		</p>
	</article>

	<Face />
</Section>
