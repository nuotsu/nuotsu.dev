import { defineField, defineType } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
	name: 'midjourney',
	title: 'Midjourney',
	type: 'document',
	liveEdit: true,
	fields: [
		orderRankField({ type: 'midjourney' }),
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'image',
			type: 'image',
			validation: (Rule) => Rule.required(),
		}),
	],
})
