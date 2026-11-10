<script lang="ts">
	import Projects from '$ui/projects.svelte'
	import Contacts from '$ui/contacts.svelte'
	import Scramble from '$ui/scramble.svelte'
	import Writing from '$ui/writing.svelte'
	import Testimonials from '$ui/testimonials.svelte'
</script>

<header class="section">
	<div class="border-b-sm pt-ch">
		<a href="/" class="link">
			<strong class="uppercase text-glow">
				<Scramble text="nuotsu" trigger="hover" />
			</strong>
		</a>
	</div>
</header>

<Projects />
<Contacts />
<Writing />
<Testimonials />
