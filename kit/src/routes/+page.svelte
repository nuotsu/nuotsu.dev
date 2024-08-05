<svelte:head>
	<title>Mitchell Kazumaru Christ | nuotsu | Web Dev</title>
	<meta
		name="description"
		content="I make websites. I generate images with Midjourney, too."
	/>
</svelte:head>

<Header />

<section
	class="mt-auto text-right flex items-end justify-between gap-4 pb-1 sm:px-1"
>
	<AccountList />
	<ProjectList />
</section>

<script lang="ts">
	import Header from '@/lib/Header.svelte'
	import AccountList from '@/lib/AccountList.svelte'
	import ProjectList from '@/lib/ProjectList.svelte'
</script>
