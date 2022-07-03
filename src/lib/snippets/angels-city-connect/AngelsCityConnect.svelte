<figure>
	<halo>
		<letter-a>
			<stroke class="behind middle" />
			<stroke class="behind left" />
			<stroke class="behind right" />
		</letter-a>
		<letter-a>
			<stroke class="middle" />
			<stroke class="left" />
			<stroke class="right" />
		</letter-a>
	</halo>
</figure>

<style>
	figure {
		--red: #e11a31;
		--red-dark: #b61d3d;
		--gray: #a8a8a6;
		--cream: #faf6ea;

		--👼: 1;
		--size: 235px;
		--angle: 12deg;
		--halo: calc(var(--size) * 0.04); /* Andrew Velazquez */
		--outline: calc(var(--size) * 0.03); /* Taylor Ward */

		user-select: none;
		position: relative;
		aspect-ratio: 1;
		width: var(--size);
	}

	figure::before {
		content: '';
		position: absolute;
		inset: 0;
		background-color: var(--cream);
	}

	halo {
		display: grid;
		height: 100%;
		padding: calc(var(--size) * 0.05);
	}

	halo::before,
	halo::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 24%;
		transform: translate(-50%, -50%);
		width: 83%;
		aspect-ratio: 3;
		border-radius: 100%;
		border: var(--halo) solid var(--gray);
		animation: halo 1s ease-in-out infinite;
	}

	halo::after {
		clip-path: polygon(-25% -25%, 125% -25%, 125% 50%, -25% 50%);
	}

	halo::before {
		margin-top: -0.5px;
		clip-path: polygon(-25% 50%, 125% 50%, 125% 125%, -25% 125%);
	}

	@keyframes halo {
		50% {
			border-color: #fff;
			transform: translate(-50%, -55%) scale(1.1);
			filter: drop-shadow(0 0 calc(var(--size) * 0.03) #eee);
		}
	}

	letter-a {
		grid-column: 1 / -1;
		grid-row: 1 / -1;
		position: relative;
		display: grid;
		color: var(--red);
	}

	stroke {
		--spread: 27%; /* Mike Trout */
		--offset: 0px;

		grid-column: 2 / -2;
		grid-row: 1 / -1;
		margin: auto;
	}

	stroke:is(.left, .right) {
		width: calc(var(--size) * 0.17); /* Shohei Ohtani */
		height: 100%;
		transform-origin: top;
		border-top-left-radius: calc(var(--size) * 0.07);
		background-color: currentColor;
		transform: skewX(calc(var(--angle) * -1 * var(--👼))) translateX(calc(var(--spread) * -1 * var(--👼)));
	}

	stroke.right {
		--👼: -1;
		direction: rtl;
	}

	stroke.behind {
		color: var(--red-dark);
		box-shadow: 0 var(--offset) 0 var(--outline) currentColor;
	}

	stroke.behind:is(.left, .right)::before {
		content: '';
		position: absolute;
		width: 100%;
		inset-block: calc(var(--size) * 0.2);
		inset-inline: auto calc(99% + var(--outline));
		background:
			radial-gradient(ellipse 100% 110% at 0 0, transparent 99%, currentColor 100%) top,
			radial-gradient(ellipse 100% 110% at 0 100%, transparent 99%, currentColor 100%) bottom;
		background-size: 100% 50.1%;
		background-repeat: no-repeat;
		transform: skewY(calc(var(--angle) * var(--👼))) scaleX(var(--👼));
	}

	stroke.behind:is(.left, .right):after {
		content: '';
		position: absolute;
		inset-inline-start: 50%;
		bottom: calc(var(--outline) * -1);
		width: calc(100% + var(--outline) * 6);
		height: 25%;
		background:
			radial-gradient(ellipse calc(52% - var(--outline)) 105% at 0 0, transparent 98.5%, currentColor 100%) left,
			radial-gradient(ellipse calc(52% - var(--outline)) 55% at 100% 50%, transparent 98.5%, currentColor 100%) right;
		background-size: 50% 100%;
		background-repeat: no-repeat;
		transform: translateX(calc(-50% * var(--👼))) scaleX(var(--👼));
	}

	stroke.middle {
		width: calc(var(--size) * 0.32); /* Raisel Iglesias */
		height: 15%;
		margin-bottom: calc(var(--size) * 0.07 + var(--offset));
		background: radial-gradient(ellipse 200% 125% at bottom right, transparent 49%, currentColor 50%);
	}

	stroke.behind.middle {
		--offset: calc(var(--outline) * -1);
	}
</style>
