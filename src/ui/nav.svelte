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

<nav class="no-scrollbar section flex gap-x-ch overflow-x-auto mask-r-from-[calc(100%-2lh)] pr-lh">
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
		top: calc(anchor(bottom) - 0.25lh);
		left: anchor(center);
		transition: left 0.2s ease-in-out;
	}
</style>
