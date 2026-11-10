import type { Attachment } from 'svelte/attachments'

export function intersectionObserver(
	callback: (entry: IntersectionObserverEntry) => void,
	options: IntersectionObserverInit = {},
): Attachment {
	return (element) => {
		let observer: IntersectionObserver | null = null

		observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				callback(entry)
			}
		}, options)

		observer.observe(element)

		return () => {
			observer.disconnect()
		}
	}
}

export function mutationObserver(
	callback: (mutation: MutationRecord) => void,
	options: MutationObserverInit = { childList: true, subtree: true },
): Attachment {
	return (element) => {
		let observer = new MutationObserver((mutationList) => {
			for (const mutation of mutationList) {
				callback(mutation)
			}
		})

		observer.observe(element, options)

		return () => observer.disconnect()
	}
}
