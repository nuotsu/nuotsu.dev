import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
	api: {
		projectId: '6puot771',
		dataset: 'v2025-oct',
	},
	deployment: {
		/**
		 * Enable auto-updates for studios.
		 * Learn more at https://www.sanity.io/docs/cli#auto-updates
		 */
		autoUpdates: true,
	},
})
