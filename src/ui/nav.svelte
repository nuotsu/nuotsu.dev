<script lang="ts">
	import { page } from '$app/state'
	import { cn } from '$lib/utils'

	const links = [
		{ label: 'About', href: '/' },
		{ label: 'Projects', href: '/projects' },
		{ label: 'Writing', href: '/writing' },
		{ label: 'Testimonials', href: '/testimonials' },
		{ label: 'Site Archive', href: '/archive' }
	]
</script>

<nav class="section flex gap-x-ch pr-lh max-md:flex-col max-md:pl-lh">
	{#each links as link}
		<a
			class={cn('shrink-0', page.url.pathname === link.href ? 'active' : 'text-subdued')}
			href={link.href}
		>
			{link.label}
		</a>
	{/each}

	<span>•</span>
</nav>

<style>
	.active {
		anchor-name: --active;
	}

	span {
		position: absolute;
		position-anchor: --active;
		width: 1lh;
		text-align: center;

		@media (width >= 48rem) {
			top: calc(anchor(bottom) - 0.25lh);
			left: anchor(center);
			translate: -50% 0;
			transition: left 0.2s ease-in-out;
		}

		@media (width < 48rem) {
			top: anchor(center);
			right: anchor(left);
			translate: 0 -50%;
			transition: top 0.2s ease-in-out;
		}
	}
</style>
