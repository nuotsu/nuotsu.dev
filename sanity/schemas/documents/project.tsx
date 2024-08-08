import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'project',
	title: 'Project',
	type: 'document',
	liveEdit: true,
	fieldsets: [{ name: 'name', options: { columns: 2 } }],
	fields: [
		defineField({
			name: 'featured',
			type: 'boolean',
			initialValue: false,
		}),
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
			name: 'id',
			type: 'slug',
			options: {
				source: 'title',
			},
			fieldset: 'name',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'url',
			title: 'URL',
			type: 'url',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'repo',
			type: 'string',
		}),
		defineField({
			name: 'startDate',
			type: 'date',
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			featured: 'featured',
			title: 'title',
			subtitle: 'startDate',
			emoji: 'emoji',
		},
		prepare: ({ featured, title, subtitle, emoji }) => ({
			title: [featured && '★', title].filter(Boolean).join(' '),
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
