import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'work',
	title: 'Work',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'url',
			title: 'URL',
			type: 'url',
		}),
		defineField({
			name: 'links',
			type: 'array',
			of: [{ type: 'url' }],
		}),
		defineField({
			name: 'date',
			type: 'date',
		}),
		defineField({
			name: 'metaInfo',
			type: 'metaInfo',
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'plate',
			type: 'plate',
		})
	],
	orderings: [
		{
			name: 'title',
			title: 'Title',
			by: [{ field: 'title', direction: 'asc' }],
		},
		{
			name: 'date',
			title: 'Date',
			by: [{ field: 'date', direction: 'desc' }],
		},
	]
})
