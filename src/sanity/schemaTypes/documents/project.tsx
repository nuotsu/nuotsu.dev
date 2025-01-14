import React from 'react'
import { defineField, defineType } from 'sanity'
import { VscBriefcase } from 'react-icons/vsc'

export default defineType({
	name: 'project',
	title: 'Project',
	icon: VscBriefcase,
	type: 'document',
	liveEdit: true,
	fieldsets: [
		{ name: 'meta', options: { columns: 2 } },
		{ name: 'name', options: { columns: 2 } },
		{ name: 'url', options: { columns: 2 } },
	],
	fields: [
		defineField({
			name: 'hidden',
			type: 'boolean',
			initialValue: false,
			fieldset: 'meta',
		}),
		defineField({
			name: 'featured',
			type: 'boolean',
			initialValue: false,
			fieldset: 'meta',
		}),
		defineField({
			name: 'title',
			type: 'string',
			fieldset: 'name',
			validation: (Rule) => Rule.required(),
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
			name: 'emoji',
			type: 'string',
			fieldset: 'name',
		}),
		defineField({
			name: 'url',
			title: 'URL',
			type: 'url',
			validation: (Rule) => Rule.required(),
			fieldset: 'url',
		}),
		defineField({
			name: 'repo',
			type: 'string',
			fieldset: 'url',
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
			startDate: 'startDate',
			emoji: 'emoji',
		},
		prepare: ({ featured, title, startDate, emoji }) => ({
			title: [featured && '★', title].filter(Boolean).join(' '),
			subtitle: startDate,
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
