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
			name: 'featured',
			title: '⭐ Featured',
			type: 'boolean',
			initialValue: false,
			fieldset: 'meta',
		}),
		defineField({
			name: 'redacted',
			title: '🔒 Redacted',
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
			title: 'title',
			emoji: 'emoji',
			featured: 'featured',
			redacted: 'redacted',
		},
		prepare: ({ title, emoji, featured, redacted }) => ({
			title: [title, featured && '⭐'].filter(Boolean).join(' '),
			media: (
				<span
					style={{
						position: 'relative',
						display: 'grid',
						placeContent: 'center',
					}}
				>
					{emoji}
					{redacted && (
						<span
							style={{
								position: 'absolute',
								bottom: 0,
								right: 0,
								translate: '50% 25%',
								fontSize: '.5em',
							}}
						>
							🔒
						</span>
					)}
				</span>
			),
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
