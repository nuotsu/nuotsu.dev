<ol class="[&_a]:transition-opacity">
	<li><a href="#intro">Intro</a></li>
	<li><a href="#notable-works">Notable Works</a></li>
	<li><a href="#projects">Projects</a></li>
	<li><a href="#testimonials">Testimonials</a></li>
	<li><a href="#gear">Gear</a></li>
	<li><a href="#about">About</a></li>
	<li><a href="#contact">Contact</a></li>
</ol>

<style>
	ol:has(a:hover) a:not(:hover) {
		opacity: 0.5;
	}

	li {
		counter-increment: item;
		display: grid;
		grid-template-columns: subgrid;
	}

	a {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1ch;

		&::after {
			content: counter(item, upper-roman);
			color: var(--color-foreground-subdued);
			font-family: var(--font-serif);
		}
	}
</style>
