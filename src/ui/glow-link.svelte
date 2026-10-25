<script lang="ts">
	import type { Snippet } from 'svelte'

	let {
		href,
		color,
		children,
	}: { href: string; color: string; children: Snippet } = $props()

	let x = $state(50)
	let y = $state(50)

	function track(e: PointerEvent) {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
		x = ((e.clientX - rect.left) / rect.width) * 100
		y = ((e.clientY - rect.top) / rect.height) * 100
	}
</script>

<a
	{href}
	style:--glow={color}
	style:--x="{x}%"
	style:--y="{y}%"
	onpointermove={track}
	onpointerdown={track}
>
	{@render children()}
</a>

<style>
	@property --t {
		syntax: '<angle>';
		inherits: false;
		initial-value: 0deg;
	}

	@property --x {
		syntax: '<percentage>';
		inherits: false;
		initial-value: 50%;
	}

	@property --y {
		syntax: '<percentage>';
		inherits: false;
		initial-value: 50%;
	}

	@property --spot {
		syntax: '<percentage>';
		inherits: false;
		initial-value: 0%;
	}

	@property --halo {
		syntax: '<percentage>';
		inherits: false;
		initial-value: 35%;
	}

	a {
		color: var(--glow);
		filter: drop-shadow(
			0 0 0.3em color-mix(in oklab, var(--glow) var(--halo), transparent)
		);
		transition:
			--x 0.4s ease-out,
			--y 0.4s ease-out,
			--spot 0.3s ease-out,
			--halo 0.3s ease-out;

		&:hover,
		&:active,
		&:focus-visible {
			--spot: 100%;
			--halo: 75%;
		}
	}

	@supports (color: oklch(from red l c h)) {
		a {
			--warm: oklch(from var(--glow) l c calc(h + 45));
			--cool: oklch(from var(--glow) l c calc(h - 40));
			--light: oklch(from var(--glow) 0.97 calc(c * 0.3) h);

			color: transparent;
			background:
				radial-gradient(
					40% 140% at var(--x) var(--y),
					color-mix(in oklab, var(--light) var(--spot), transparent),
					transparent
				),
				radial-gradient(
					45% 160% at calc(50% + 45% * cos(var(--t)))
						calc(50% + 60% * sin(var(--t) * 2)),
					var(--warm),
					transparent
				),
				radial-gradient(
					50% 160% at calc(50% + 45% * cos(var(--t) * -1 + 120deg))
						calc(50% + 60% * sin(var(--t) + 120deg)),
					var(--cool),
					transparent
				),
				radial-gradient(
					40% 140% at calc(50% + 40% * sin(var(--t) * 2 + 240deg))
						calc(50% + 50% * cos(var(--t) * -1 + 240deg)),
					var(--light),
					transparent
				),
				var(--glow);
			background-clip: text;
			animation: blob 9s linear infinite;
		}
	}

	@keyframes blob {
		to {
			--t: 360deg;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		a {
			animation: none;
		}
	}
</style>
