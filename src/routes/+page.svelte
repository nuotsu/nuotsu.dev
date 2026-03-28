<script lang="ts">
	import { about, archive, links, writing } from '$lib/constants'
	import Projects from '$ui/projects.svelte'
	import Testimonials from '$ui/testimonials.svelte'
</script>

<section id="about">
	<h2>About</h2>
	<p>
		I'm a web dev who loves to build things with code. I'm the Senior Developer at
		<a href="https://human.marketing">Human Marketing</a> by day, and a freelancer by night,
		building
		<a href="https://typed.sanitypress.dev">SanityPress</a>
		and <a href="https://mlb.theohtani.com">an MLB scorebug</a> that nobody asked for but a specific niche
		of nerds in the world secretly need.
	</p>

	<p>TLDR; I am all of the following:</p>
	<ul class="columns-[24ch] *:break-inside-avoid [&>::marker]:content-['✔︎_']">
		{#each about as { value, href }}
			<li>
				{value}
				{#if href}
					<a {href}>*</a>
				{/if}
			</li>
		{/each}
	</ul>

	<h3>My Mission & Philosophy</h3>
	<p>My mission is to <em>make the world a better place, one great website at a time</em>.</p>
	<p>Philosophy bullets:</p>
	<ul>
		<li>
			<strong>Utilize the platform</strong>; the Web is king and all shall respect its authority.
		</li>
		<li>
			<strong>Optimize for CSS, minimize JavaScript</strong>; if you're reaching for a dependency to
			do what CSS can already do, we need to talk.
		</li>
	</ul>
</section>

<Projects />

<Testimonials />

<section id="writing">
	<h2>Writing</h2>
	<p>
		I don't write much, but when I do, it's usually about niche web dev topics. By yours truly
		<del>and the help of AI</del>.
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
	<p>I update this site compulsively. Here lies the evidence.</p>
	<ul>
		{#each archive as { href, date, emoji }}
			<li>
				<a {href}>{date}</a>
				{#if emoji}{emoji}{/if}
			</li>
		{/each}
	</ul>
</section>

<section id="contact">
	<h2>Contact</h2>
	<p>Shall we collaborate? Reach out:</p>
	<ul>
		{#each links as { label, href }}
			<li>
				<a {href}>{label}</a>
			</li>
		{/each}
	</ul>
</section>
