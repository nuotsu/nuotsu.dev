<section class="bg-white /60 backdrop-blur shadow-real rounded overflow-hidden">
	<h2 class="bg-black text-white first-letter:font-extrabold font-extralight uppercase text-xl px-2">
		{title}
	</h2>

	<div class="p-2 font-text">
		<slot></slot>
	</div>
</section>

<script lang="ts">
	export let title: string
</script>
