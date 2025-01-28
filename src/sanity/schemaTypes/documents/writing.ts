import { defineField, defineType } from 'sanity'
import { VscEdit } from 'react-icons/vsc'

export default defineType({
	name: 'writing',
	title: 'Writing',
	icon: VscEdit,
	type: 'document',
	liveEdit: true,
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
			name: 'date',
			type: 'date',
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'url',
		},
	},
	orderings: [
		{
			name: 'date',
			title: 'Date',
			by: [{ field: 'date', direction: 'desc' }],
		},
		{
			name: 'title',
			title: 'Title',
			by: [{ field: 'title', direction: 'asc' }],
		},
	],
})
