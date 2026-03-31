<script lang="ts">
	import { dev } from '$app/environment'

	const ascii = `                                      .                        
                                    .o8                        
ooo. .oo.   oooo  oooo   .ooooo.  .o888oo  .oooo.o oooo  oooo  
\`888P"Y88b  \`888  \`888  d88' \`88b   888   d88(  "8 \`888  \`888  
 888   888   888   888  888   888   888   \`"Y88b.   888   888  
 888   888   888   888  888   888   888 . o.  )88b  888   888  
o888o o888o  \`V88V"V8P' \`Y8bod8P'   "888" 8""888P'  \`V88V"V8P' `

	!dev && console.log(ascii)
</script>

<aside class="pointer-events-none fixed top-1/2 left-1/2 z-1 -translate-1/2 opacity-5">
	<pre class="text-[7px] leading-none">{ascii}</pre>
</aside>
