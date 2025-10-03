<script lang="ts">
	import '@/app.css'

	let { data, children } = $props()
</script>

<svelte:head>
	<title>Mitchell Christ</title>
	<meta name="description" content={data.global?.tagline} />
</svelte:head>

<hgroup>
	<h1>Mitchell Christ</h1>
	<h2 class="before:content-['//_']">{data.global?.tagline}</h2>
</hgroup>

{@render children?.()}
