<script lang="ts">
	import LocalTime from '@/ui/local-time.svelte'
	import '@/app.css'

	let { data, children } = $props()
</script>

<svelte:head>
	<title>Mitchell Christ // nuotsu</title>
	<meta name="description" content={data.global?.tagline} />
</svelte:head>

<main class="flex flex-col gap-ch">
	<hgroup>
		<h1>Mitchell Christ / nuotsu</h1>
		<h2 class="before:content-['//_']">{data.global?.tagline}</h2>
	</hgroup>

	<LocalTime />
</main>

{@render children?.()}
