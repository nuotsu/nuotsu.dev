import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
	name: 'site',
	title: 'Site',
	type: 'document',
	liveEdit: true,
	fields: [
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
		select: {},
		prepare: ({}) => ({
			title: 'Site',
		}),
	},
})
