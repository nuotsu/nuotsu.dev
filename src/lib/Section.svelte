<section class="section {className}">
	<header class="relative text-left">
		<h2 class="absolute left-0 top-0">{title}</h2>
		<pre
			class="relative bg-black text-accent/50"
			aria-hidden="true"
		>{jsdoc(title)}</pre>
	</header>

	<slot></slot>
</section>

<script lang="ts">
	export let
		title: string,
		className: string = ''

	function jsdoc(title: string) {
		return `/**\n * ${title}\n */`
	}
</script>
