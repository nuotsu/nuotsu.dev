<header class="sticky top-0">
	<div
		class="relative flex items-end overflow-x-auto overflow-y-clip no-scrollbar ml-[-.5ch]"
	>
		<div class="sticky left-0 bottom-[.5ch] z-1">
			<p class="absolute left-0 bottom-0 bg-canvas p-[.5ch]">nuotsu</p>
		</div>

		<h1 class="relative text-9xl overflow-hidden shrink-0 tracking-[-0.075em]">
			I make websites.
			<BaseballCap />
		</h1>
	</div>
</header>

<p class="text-neutral-400">
	I generate images with <strong>Midjourney</strong>, too.
</p>

<h2 class="text-neutral-400 mt-2">
	Welcome to
	<strong class="text-ink">Mitchell Kazumaru Christ</strong>'s website.
</h2>

<section
	class="mt-auto text-right flex items-end justify-between gap-4 pb-1 sm:px-1"
>
	<AccountList />
	<ProjectList />
</section>

<style>
	strong {
		font-weight: normal;
		color: theme('colors.ink');
	}
</style>

<script lang="ts">
	import BaseballCap from '@/ui/BaseballCap.svelte'
	import AccountList from '@/ui/AccountList.svelte'
	import ProjectList from '@/ui/ProjectList.svelte'
</script>
