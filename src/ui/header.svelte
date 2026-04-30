<script lang="ts">
	import favicon from '$assets/favicon.png?enhanced'

	const aliases = ['nuotsu', 'XZ', 'Kazumaru']
</script>

<header class="space-y-lh">
	<div class="flex items-stretch gap-lh *:shrink-0">
		<hgroup>
			<h1 class="h1 mb-0">Mitchell Christ</h1>
			<p class="text-current/50 before:content-['@_']">
				{#each aliases as alias, i}
					<em>{alias}</em>{#if i < aliases.length - 1}{' / '}{/if}
				{/each}
			</p>
		</hgroup>

		<div class="checkerboard grow mask-x-from-[calc(100%-2lh)]"></div>

		<enhanced:img
			class="size-[2lh] rounded-full text-transparent opacity-0 transition-opacity"
			src={favicon}
			alt="Mitchell Christ"
			width="40"
			height="40"
			loading="eager"
			draggable={false}
			onload={(e) => {
				const el = e.currentTarget
				if (el instanceof HTMLElement) {
					el.classList.remove('text-transparent', 'opacity-0')
				}
			}}
		/>
	</div>

	<nav>
		<ol class="list-[lower-roman] pl-[5ch] hover-list marker:text-current/50 [&_a]:block">
			<li><a href="#about">About</a></li>
			<li><a href="#projects">Projects</a></li>
			<li><a href="#writing">Writing</a></li>
			<li><a href="#testimonials">Testimonials</a></li>
			<li><a href="#archive">Archive</a></li>
			<li><a href="#contact">Contact</a></li>
		</ol>
	</nav>
</header>

<style>
	.checkerboard {
		background-image: repeating-conic-gradient(
			color-mix(in srgb, currentColor 10%, transparent) 0% 25%,
			transparent 0% 50%
		);
		background-size: 1lh 1lh;
		animation: checkerboard-drift 1s linear infinite;
	}

	@keyframes checkerboard-drift {
		to {
			background-position: calc(-1 * 1lh) 0;
		}
	}
</style>
