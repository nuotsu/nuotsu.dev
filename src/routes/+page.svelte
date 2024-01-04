<article class="max-w-md mx-auto space-y-6 px-4 leading-loose text-lg">
	<p class="text-center text-4xl">Hello!</p>
	<h1>
		My name is <span class="webdev">Mitchell Kazumaru Christ</span>, and I go by
		the handle
		<code class="font-sans text-[#2a7cde]">nuotsu</code> on the Internet.
	</h1>
	<p>
		I am a <span class="webdev">frontend web developer</span>, currently working
		at
		<a href="https://human.marketing" class="text-[#ff5a2f]">human</a>
		in Irvine, California, building customized and high-quality
		<span class="inline-block">e-commerce</span> websites for our clients.
	</p>
	<p>
		The main languages I write in are
		<span class="text-[#3178c6]">TypeScript</span>,
		<span class="shopify">Liquid</span> and
		<span class="svelte">Svelte</span>, with a strong focus in crafting complex
		layouts using modern CSS and
		<span class="text-[#0ea5e9]">Tailwind</span>.
	</p>
	<p>
		I have ample knowledge of Next.js, <span class="svelte">SvelteKit</span>,
		<span class="text-[#f36458]">Sanity.io</span>,
		<a
			href="https://www.credly.com/badges/714964a0-6bbb-4da8-9c02-e91b005fc967/linked_in_profile"
			class="shopify">Shopify</a
		>
		and <span class="text-[#0d52ff]">BigCommerce</span>.
	</p>
	<p>
		Some of my professional works include:
		<a href="https://attentionmonsters.com" class="attention-monsters"
			>a neo-rock band discography website</a
		>,
		<a href="https://rwfine.com" class="text-[#dfd6c5]">a fine jewelry store</a
		>,
		<a
			href="https://fastechus.com"
			class="text-gradient from-[#5ac152] to-[#30a62a] !decoration-[#5ac152]"
			>an HVAC solutions business</a
		>,
		<a href="https://www.brdaelectric.com/" class="text-[#186bb8]"
			>a commercial and residential electrician website</a
		>,
		<a href="https://cuscousainc.com" class="text-[#ed3137]"
			>a performance car parts site</a
		>
		and more. Go check out my
		<a href="https://github.com/mitchuman" class="github">work GitHub</a>.
	</p>
	<p>
		Some of my personal works include:
		<a href="https://timeless-docs.vercel.app" class="text-[#1f9d47]"
			>Timeless Shopify theme</a
		>, <a href="https://blog-not.vercel.app">The Artificial Blog</a>,
		<a href="https://vibes-machine.vercel.app" class="text-[#2664f6]"
			>Vibes Machine</a
		>,
		<a href="https://ohtani.fun" class="text-[#e00101]"
			>The Faces of Shohei Ohtani</a
		>,
		<a href="https://theohtani.com" class="text-[#005596]">TheOhtani.com</a>
		and more. Go check out my
		<a href="https://github.com/nuotsu" class="github">personal GitHub</a>.
	</p>
	<p>
		When I'm not coding, I watch <ruby>MLB<rt>⚾️</rt></ruby>, and play
		<ruby>golf<rt>⛳️</rt></ruby> or <ruby>badminton<rt>🏸</rt></ruby>, and take
		my <ruby>Cayman<rt>🏎️</rt></ruby> for a drive.
	</p>
	<p>
		You can reach out to me on
		<a href="https://instagram.com/marutchell">Instagram</a>,
		<a href="https://linkedin.com/in/nuotsu">LinkedIn</a>,
		<a href="https://fiverr.com/nuotsu">Fiverr</a>, or feel free to
		<a href="mailto:xzmaru@gmail.com">email me</a>.
	</p>

	<Portrait />
</article>

<style>
	.text-gradient {
		@apply bg-clip-text bg-gradient-to-r text-transparent;
	}

	.webdev {
		@apply text-gradient from-[#c0bafe] to-[#f1c455];
	}

	.attention-monsters {
		@apply text-gradient from-[#32909c] to-[#d7723e] decoration-[#32909c];
	}

	.svelte {
		color: #ff3e00;
	}

	.shopify {
		@apply text-gradient from-[#15c064] to-[#00d1ff] decoration-[#15c064];
	}

	.github {
		color: #848d97;
	}
</style>

<script>
	import Portrait from './Portrait.svelte'
</script>
