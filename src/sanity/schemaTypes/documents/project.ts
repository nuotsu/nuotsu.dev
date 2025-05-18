import { defineField, defineType } from 'sanity'
import { VscVariableGroup } from 'react-icons/vsc'

export default defineType({
	name: 'project',
	title: 'Project',
	icon: VscVariableGroup,
	type: 'document',
	liveEdit: true,
	fieldsets: [{ name: 'links', options: { columns: 2 } }],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'url',
			title: 'URL',
			type: 'url',
			validation: (Rule) => Rule.required(),
			fieldset: 'links',
		}),
		defineField({
			name: 'repo',
			type: 'string',
			fieldset: 'links',
		}),
		defineField({
			name: 'thumbnail',
			type: 'image',
		}),
	],
	preview: {
		select: {
			title: 'title',
			media: 'thumbnail',
		},
	},
})
