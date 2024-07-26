import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import structure from './src/structure'

export default defineConfig({
	name: 'default',
	title: 'nuotsu.dev',

	projectId: '6puot771',
	dataset: 'production',

	plugins: [
		structureTool({
			title: 'Content',
			structure,
		}),
		visionTool({
			title: 'GROQ',
		}),
	],

	scheduledPublishing: {
		enabled: false,
	},

	schema: {
		types: schemaTypes,
	},
})
