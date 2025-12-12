<script lang="ts">
	import { intersecting } from '$lib/intersection-observer'
</script>

<footer
	id="footer"
	{@attach intersecting({ 'data-is-intersecting': true }, { threshold: 0.5 })}
>
	<enhanced:img
		class="w-full object-cover"
		src="$assets/developer.png"
		alt={'young medieval knights templar wearing a white baseball jersey with blue lettering "Developers" and the red number "17" typing on a Macbook, Renaissance oil painting'}
		draggable={false}
	/>
</footer>

<style>
	footer :global(img) {
		height: calc(100lvh + 1px);
	}
</style>
