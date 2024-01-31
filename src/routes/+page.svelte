<section class="section">
	<h2>Mitchell Kazumaru Christ</h2>
	<p class="text-sm">
		<span>Frontend Web Development</span> /
		<span>AI Image Generation</span> /
		<a
			href="https://www.credly.com/badges/714964a0-6bbb-4da8-9c02-e91b005fc967/linked_in_profile"
		>
			Shopify Certified
		</a>
	</p>
</section>

<Works />
<Divider />
<Contact />

<style lang="postcss">
	span {
		@apply transition-opacity;
	}

	p:has(:hover) :not(:hover) {
		opacity: 0.5;
	}
</style>

<script lang="ts">
	import Works from '$lib/Works.svelte'
	import Divider from '$lib/Divider.svelte'
	import Contact from '$lib/Contact.svelte'
</script>
