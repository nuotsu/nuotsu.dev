import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'metaInfo',
	title: 'Meta info',
	type: 'object',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'description',
			type: 'text',
			rows: 3,
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {
				source: document => document.title,
			},
			validation: Rule => Rule.required(),
		}),
	],
})
