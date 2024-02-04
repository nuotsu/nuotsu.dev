import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'project',
	title: 'Project',
	type: 'document',
	fieldsets: [{ title: 'name', name: 'name', options: { columns: 2 } }],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			fieldset: 'name',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'emoji',
			type: 'string',
			fieldset: 'name',
		}),
		defineField({
			name: 'url',
			title: 'URL',
			type: 'url',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'startDate',
			type: 'date',
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'startDate',
			emoji: 'emoji',
		},
		prepare: ({ title, subtitle, emoji }) => ({
			title,
			subtitle,
			media: <>{emoji}</>,
		}),
	},
	orderings: [
		{
			name: 'startDate',
			title: 'Start date',
			by: [{ field: 'startDate', direction: 'desc' }],
		},
		{
			name: 'title',
			title: 'Title',
			by: [{ field: 'title', direction: 'asc' }],
		},
	],
})
