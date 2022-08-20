<svelte:head>
	<title>Bio | nuotsu</title>
</svelte:head>

<Article title="Bio">
	<p>Mitchell <ruby>Kazumaru<rt>和丸</rt></ruby> Christ is the name.</p>
	<p>I'm a frontend web dev based in SoCal.</p>
	<p>I have a strong passion for architecting websites in modern CSS and JS.</p>
	<p>Svelte-lover. Supra-driver.</p>

	<Marquee>
		<p class="emojis">
			{#each '⚾️,🏂,🏎,⌨️'.split(',') as emoji}
				<span>{emoji}</span>
			{/each}
		</p>
	</Marquee>
</Article>

<style>
	.emojis {
		display: flex;
		gap: 1ch;
		margin-right: 1ch;
	}
</style>

<script>
	import Article from '$lib/Article.svelte'
	import Marquee from '$lib/snippets/marquee/Marquee.svelte'
</script>
