import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
	name: 'default',
	title: 'nuotsu',

	projectId: 'bydcdjmg',
	dataset: 'production',

	plugins: [
		deskTool({
			structure: (S, context) =>
				S.list()
					.title('Content')
					.items([
						S.documentTypeListItem('work').title('Works').icon(() => '💼'),
					])
		}),
		visionTool(),
	],

	schema: {
		types: schemaTypes,
	},
})
