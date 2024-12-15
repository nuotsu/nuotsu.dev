import { defineCliConfig } from 'sanity/cli'
import { projectId, dataset } from './lib/env'

export default defineCliConfig({
	api: {
		projectId,
		dataset,
	},
	autoUpdates: true,
})
