import type { Attachment } from 'svelte/attachments'

/**
 * Tracks which link is being hovered/pressed.
 * Use `preview.attach` on `<a>` elements and render `preview.url` (e.g. via `<LinkOutput>`).
 */
export function createLinkPreview() {
	let active = $state('')

	const events = {
		mouseenter: (el: HTMLAnchorElement) => (active = el.getAttribute('href') ?? ''),
		mouseleave: () => (active = ''),
		pointerdown: (el: HTMLAnchorElement) => (active = el.getAttribute('href') ?? ''),
		pointerup: () => (active = '')
	}

	const attach: Attachment<HTMLAnchorElement> = (element) => {
		const entries = Object.entries(events).map(([type, handler]) => {
			const listener = () => handler(element)
			element.addEventListener(type, listener)
			return [type, listener] as const
		})

		return () => {
			for (const [type, listener] of entries) element.removeEventListener(type, listener)
		}
	}

	return {
		attach,
		get active() {
			return active
		},
		get url() {
			return active.replace(/^(https?:\/\/(www\.)?|mailto:)/, '')
		}
	}
}

export type LinkPreview = ReturnType<typeof createLinkPreview>
