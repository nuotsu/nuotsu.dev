<section
	class="text-white bg-white/10 backdrop-blur-sm backdrop-saturate-[1.2] p-4 shadow-real rounded overflow-hidden break-inside-avoid"
	style:rotate="{Math.random() * 2 - 1}deg"
>
	<h2 class="font-boston uppercase text-shadow-real pb-2 mb-4 text-xl border-b-2 border-current">
		{title}
	</h2>

	<slot></slot>
</section>

<script lang="ts">
	export let title: string
</script>
