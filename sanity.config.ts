import { defineConfig } from 'sanity'
import { structure } from '@/sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@/sanity/schemaTypes'

const singletonTypes = ['site']

export default defineConfig({
	title: 'nuotsu',
	projectId: '6puot771',
	dataset: 'production',
	basePath: '/admin',

	plugins: [structure, visionTool()],

	schema: {
		types: schemaTypes,
		templates: (templates) =>
			templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
	},

	document: {
		actions: (input, { schemaType }) =>
			singletonTypes.includes(schemaType)
				? input.filter(
						({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action),
					)
				: input,
	},

	tasks: { enabled: false },
	// scheduledPublishing: { enabled: false },
})
