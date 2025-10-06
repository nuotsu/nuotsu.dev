import { defineField, defineType } from 'sanity'
import { VscQuote } from 'react-icons/vsc'

export default defineType({
	name: 'testimonial',
	title: 'Testimonial',
	icon: VscQuote,
	liveEdit: true,
	type: 'document',
	fields: [
		defineField({
			name: 'quote',
			title: 'Quote',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'author',
			title: 'Author',
			type: 'string',
		}),
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'source',
			type: 'url',
		}),
	],
	preview: {
		select: {
			title: 'quote',
			subtitle: 'author',
		},
	},
})
