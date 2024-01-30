// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace Nuotsu {
		type Work = {
			title: string
			url: string
			date: string
			className: string
		}
	}
}

export {}
