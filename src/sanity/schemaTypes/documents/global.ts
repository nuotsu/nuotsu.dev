import { defineField, defineType } from 'sanity'
import { VscChip } from 'react-icons/vsc'

export default defineType({
	name: 'global',
	title: 'Global',
	icon: VscChip,
	type: 'document',
	liveEdit: true,
	fields: [
		defineField({
			name: 'tagline',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'featuredProjects',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'project' }] }],
		}),
	],
	preview: {
		prepare: () => ({
			title: 'Global',
		}),
	},
})
