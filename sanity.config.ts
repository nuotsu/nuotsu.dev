import { defineConfig } from 'sanity'
import structure from '@/sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@/sanity/schemaTypes'

const singletonTypes = ['global']

export default defineConfig({
	name: 'default',
	title: 'nuotsu.dev',

	projectId: '6puot771',
	dataset: 'v2025-oct',

	plugins: [structure, visionTool()],

	schema: {
		types: schemaTypes,
		templates: (templates) =>
			templates.filter(
				({ schemaType }) => !singletonTypes.includes(schemaType),
			),
	},

	document: {
		actions: (input, { schemaType }) =>
			singletonTypes.includes(schemaType)
				? input.filter(
						({ action }) =>
							action &&
							['publish', 'discardChanges', 'restore'].includes(action),
					)
				: input,
	},
})
