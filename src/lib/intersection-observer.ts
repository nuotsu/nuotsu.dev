import { type Attachment } from 'svelte/attachments'

export function intersecting(
	attributes: Record<string, string | boolean>,
	options: IntersectionObserverInit = {},
): Attachment {
	return (element) => {
		let observer: IntersectionObserver | null = null

		const handleIntersection = (entries: IntersectionObserverEntry[]) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					// Apply attributes when intersecting
					for (const [name, value] of Object.entries(attributes)) {
						if (value === null || value === undefined || value === false) {
							element.removeAttribute(name)
						} else if (value === true) {
							element.setAttribute(name, '')
						} else {
							element.setAttribute(name, String(value))
						}
					}
				} else {
					for (const name of Object.keys(attributes)) {
						element.removeAttribute(name)
					}
				}
			}
		}

		observer = new IntersectionObserver(handleIntersection, options)
		observer.observe(element)

		return () => {
			if (observer) observer.disconnect()

			for (const name of Object.keys(attributes)) {
				element.removeAttribute(name)
			}
		}
	}
}
