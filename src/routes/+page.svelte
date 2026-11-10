<script lang="ts">
	import Contacts from '$ui/contacts.svelte'
	import Scramble from '$ui/scramble.svelte'
	import Writing from '$ui/writing.svelte'
	import Testimonials from '$ui/testimonials.svelte'
</script>

<header class="mx-lh border-b-sm pt-ch">
	<a href="/" class="link">
		<strong class="uppercase text-glow">
			<Scramble text="nuotsu" />
		</strong>
	</a>
</header>

<Contacts />
<Writing />
<Testimonials />
