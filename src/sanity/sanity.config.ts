import { defineConfig } from 'sanity'
import { projectId, dataset } from './lib/env'
import { structure } from './structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
	projectId,
	dataset,
	basePath: '/admin',

	plugins: [structure, visionTool()],

	schema: {
		types: schemaTypes,
	},

	tasks: { enabled: false },
	scheduledPublishing: { enabled: false },
})
