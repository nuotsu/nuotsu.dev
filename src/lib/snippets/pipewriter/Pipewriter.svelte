{displayedText.slice(0, progress)}<span />

<style>
	span {
		pointer-events: none;
		user-select: none;
		display: inline-block;
		vertical-align: text-bottom;
		height: 1.2em;
		border-right: 1px solid;
		animation: cursor 1s infinite;
	}

	@keyframes cursor {
		50% { opacity: 0; }
	}
</style>

<script>
	export let
		text,
		typeSpeed = 100,
		backspaceSpeed = 50,
		duration = 2000

	let
		progress = 0,
		index = 0

	$: displayedText = Array.isArray(text) ? text[index] : text

	function initType() {
		const type = setInterval(() => {
			progress++

			if (progress == displayedText.length) {
				clearInterval(type)

				if (Array.isArray(text)) {
					setTimeout(() => {
						const backspace = setInterval(() => {
							progress--

							if (progress == 0) {
								clearInterval(backspace)
								progress = 0

								index = (index + 1) % text.length

								setTimeout(() => {
									initType(index)
								}, typeSpeed * 3)
							}
						}, backspaceSpeed)
					}, duration)
				}
			}
		}, typeSpeed)
	}

	initType()
</script>
