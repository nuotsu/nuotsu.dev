import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
	name: 'default',
	title: 'nuotsu.dev',

	projectId: '6puot771',
	dataset: 'v2025-oct',

	plugins: [structureTool(), visionTool()],

	schema: {
		types: schemaTypes,
	},
})
