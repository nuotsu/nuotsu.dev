<script lang="ts">
	import Scramble from '#ui/scramble.svelte'
	import Intro from '#ui/intro.svelte'
	import Projects from '#ui/projects.svelte'
	import Testimonials from '#ui/testimonials.svelte'
	import Writing from '#ui/writing.svelte'
	import Contacts from '#ui/contacts.svelte'
	import Cursor from '#ui/cursor.svelte'
	import Element from '#ui/element.svelte'
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
	class="m-auto grid max-w-7xl auto-rows-auto gap-[2lh] md:grid-cols-6 md:items-end md:*:col-span-full"
>
	<Intro />

	<div class="col-span-full grid grid-cols-subgrid items-end gap-[inherit] md:gap-x-[4lh]">
		<Projects />
		<Testimonials />
	</div>

	<Writing />
	<Contacts />
</main>

<Cursor />

<div
	class="debugger pointer-events-none fixed top-0 right-0 -z-1 flex h-svh items-end justify-between gap-ch text-[.5em] opacity-30 select-none"
>
	<Element />
	<Viewport />
</div>

<style>
	header {
		padding-left: max(env(safe-area-inset-left), calc(1rlh + 0.5rch));
		padding-right: max(env(safe-area-inset-right), calc(1rlh + 0.5rch));
	}

	main {
		padding-left: env(safe-area-inset-left);
		padding-right: env(safe-area-inset-right);
	}

	.debugger {
		writing-mode: sideways-rl;
		padding-top: max(env(safe-area-inset-top), calc(1rlh + 1rch));
		padding-bottom: max(env(safe-area-inset-bottom), 0.5rch);
	}
</style>
