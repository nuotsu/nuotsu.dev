<div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] items-start gap-8 [&_strong]:text-shadow-real">
	<Section title="Skills">
		<p class="paragraph">
			I'm a passionate developer proficient in an array of cutting-edge technologies.
			With expertise in <strong>SvelteKit</strong> and <strong>Next.js/React</strong>, I excel at building performant and intuitive web applications.
			My strong command of <strong>TypeScript</strong> ensures robust and maintainable codebases.
			Leveraging <strong>Tailwind CSS</strong>, I craft stunning user interfaces with ease.
			I'm well-versed in deploying projects using <strong>Vercel</strong> and <strong>Netlify</strong>, ensuring seamless and reliable hosting experiences.
			Additionally, my experience with <strong>Sanity CMS</strong> empowers me to create dynamic and scalable content management solutions.
		</p>
	</Section>

	<Section title="Links">
		<p class="paragraph">
			Feel free to connect with me through various channels.
			On <strong><a href="https://github.com/nuotsu">GitHub</a></strong>, you can explore my code repositories and see my contributions to open-source projects.
			<strong><a href="https://linkedin.com/in/nuotsu">LinkedIn</a></strong> is another platform where you can find my professional profile, allowing us to connect and network in the industry.
			If you have any inquiries or collaboration opportunities, feel free to reach out to me via <strong><a href="mailto:xzmaru@gmail.com">email</a></strong>, and I'll respond promptly.
			I look forward to engaging with fellow developers and potential clients through these channels.
		</p>
	</Section>

	<Section title="Motivation">
		<div class="grid gap-4">
			<Quote cite="">"Think different."</Quote>
			<Quote>"A day without failure is a day without learning."</Quote>
			<Quote><code>const goodCode = "self-documenting"</code></Quote>
		</div>
	</Section>
</div>

<style lang="postcss">
	.paragraph {
		@apply text-xs leading-loose;
	}

	strong {
		@apply text-lg;
	}

	a {
		text-decoration: underline;
		text-decoration-style: dotted;
	}
</style>

<script lang="ts">
	import Section from '$lib/Section.svelte'
	import Quote from '$lib/Quote.svelte'
</script>
