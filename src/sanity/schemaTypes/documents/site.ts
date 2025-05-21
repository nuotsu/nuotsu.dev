import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'site',
	title: 'Site',
	type: 'document',
	liveEdit: true,
	fields: [
		defineField({
			name: 'headline',
			type: 'array',
			of: [{ type: 'block', styles: [{ title: 'H1', value: 'h1' }] }],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'about',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'portrait',
			type: 'image',
		}),
	],
	preview: {
		prepare: () => ({
			title: 'Site',
		}),
	},
})
