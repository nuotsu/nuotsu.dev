<script lang="ts">
	import { about, archive, links, writing } from '$lib/constants'
	import Projects from '$ui/projects.svelte'
	import Testimonials from '$ui/testimonials.svelte'
</script>

<section id="about">
	<h2>About</h2>
	<p>
		I'm a web dev who loves to build things with code. I'm the Senior Developer at
		<a href="https://human.marketing">Human Marketing</a> by day, and a freelancer by night working
		on
		<a href="https://typed.sanitypress.dev">SanityPress</a>
		and <a href="https://mlb.theohtani.com">an MLB scorebug</a>.
	</p>

	<p>TLDR; I am all of the following:</p>
	<ul class="columns-[24ch] *:break-inside-avoid marker:content-['✔︎_']">
		{#each about as { value, href }}
			<li>
				{value}
				{#if href}
					<a {href}>*</a>
				{/if}
			</li>
		{/each}
	</ul>
</section>

<Projects />

<Testimonials />

<section id="writing">
	<h2>Writing</h2>
	<p>
		I don't write much, but when I do, it's usually about niche web dev topics
		<del>and AI-generated</del>.
	</p>
	<ul>
		{#each writing as { href, title }}
			<li>
				<a {href}>{title}</a>
			</li>
		{/each}
	</ul>
</section>

<section id="archive">
	<h2>Site Archive</h2>
	<p>I update this site way too frequently. Here's a record of all the previous versions.</p>
	<ul>
		{#each archive as { href, date }}
			<li>
				<a {href}>{date}</a>
			</li>
		{/each}
	</ul>
</section>

<section id="contact">
	<h2>Contact</h2>
	<p>Shall we collaborate? Reach out via:</p>
	<ul>
		{#each links as { label, href }}
			<li>
				<a {href}>{label}</a>
			</li>
		{/each}
	</ul>
</section>
