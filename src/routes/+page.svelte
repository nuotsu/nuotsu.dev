<script lang="ts">
	import { about, archive, links, testimonials, writing } from '$lib/constants'
	import Projects from '$ui/projects.svelte'
</script>

<section id="about" class="space-y-lh [&_a]:link">
	<h2>About</h2>
	<p>
		I'm a web dev who loves to build things with code. I'm the Senior Developer at <a
			href="https://human.marketing">Human Marketing</a
		>
		by day; a freelancer by night, building
		<a href="https://typed.sanitypress.dev">SanityPress</a>
		and <a href="https://mlb.theohtani.com">an MLB scorebug</a>.
	</p>

	<p>In no particular order, I am:</p>
	<ul class="anchored-indicator hover-list">
		{#each about as { value }, i}
			<li style:margin-left="{i}ch">
				{value}
			</li>
		{/each}
	</ul>

	<h3>Mission & Philosophy</h3>
	<p class="text-center text-balance">
		My mission is to:
		<em class="block">
			make the world a better place,<br />one great website at a time.
		</em>
	</p>
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

<section id="writing">
	<h2>Writing</h2>
	<ul class="anchored-indicator hover-list">
		{#each writing as { title, href, date }}
			<li>
				<a class="flex gap-ch" {href}>
					<time class="shrink-0 text-current/50" datetime={date}>{date}</time>
					<span class="line-clamp-1 break-all">{title}</span>
				</a>
			</li>
		{/each}
	</ul>
</section>

<section id="testimonials">
	<h2>Testimonials</h2>

	<div class="anchored-indicator hover-list">
		{#each testimonials as { quote, author, source }}
			<figure class="relative not-last:pb-lh">
				<blockquote>
					<p class="[&_a]:link">{@html quote}</p>
				</blockquote>

				<cite class="text-current/50 before:content-['—_']">
					<a href={source}>
						{author.name}
						{#if source}
							<span class="absolute inset-0"></span>
						{/if}
					</a>

					{#if author.title}
						<span class="before:content-['//_']">{author.title}</span>
					{/if}
				</cite>
			</figure>
		{/each}
	</div>
</section>

<section id="archive">
	<h2>Archive</h2>
	<ul class="anchored-indicator columns-[14ch] hover-list *:break-inside-avoid">
		{#each archive as { date, href, emoji }}
			<li>
				<a class="flex gap-ch not-hover:grayscale" {href}>
					<time class="shrink-0 text-current/50" datetime={date}>{date}</time>
					{emoji}
				</a>
			</li>
		{/each}
	</ul>
</section>

<section id="contact">
	<h2>Contact</h2>
	<ul class="anchored-indicator hover-list">
		{#each links as { title, href, label }}
			<li>
				<a class="flex" class:gap-ch={!href.startsWith('mailto:')} {href}>
					{title}
					{#if label}
						<span class="text-current/50">{label}</span>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</section>
