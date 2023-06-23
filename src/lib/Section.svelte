<section
	class="bg-white/70 backdrop-blur shadow-real rounded overflow-hidden"
	style:rotate="{Math.random() * 2 - 1}deg"
>
	<h2 class="new-era block text-xl px-4">
		{title}
	</h2>

	<div class="p-4">
		<slot></slot>
	</div>
</section>

<script lang="ts">
	export let title: string
</script>
