<script lang="ts">
	import Scramble from '#ui/scramble.svelte'
	import Intro from '#ui/intro.svelte'
	import Projects from '#ui/projects.svelte'
	import Testimonials from '#ui/testimonials.svelte'
	import Writing from '#ui/writing.svelte'
	import Contacts from '#ui/contacts.svelte'
	import Cursor from '#ui/cursor.svelte'
	import Viewport from '#ui/viewport.svelte'
</script>

<header class="section">
	<div class="border-b-sm pt-ch">
		<a href="/" class="link">
			<strong class="uppercase text-glow">
				<Scramble text="nuotsu" trigger={['hover', 'view']} />
			</strong>
		</a>
	</div>
</header>

<main
	class="mx-auto mt-[2lh] grid max-w-7xl gap-[2lh] md:grid-cols-6 md:items-end md:*:col-span-full"
>
	<Intro />
	<Projects />
	<Testimonials />
	<Writing />
	<Contacts />
</main>

<Cursor />
<Viewport />

<style>
	header {
		padding-inline: calc(1lh + 0.5ch) 1lh;
	}
</style>
