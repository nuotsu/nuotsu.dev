import { defineField, defineType } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'
import { VscVariableGroup } from 'react-icons/vsc'

export default defineType({
	name: 'project',
	title: 'Project',
	icon: VscVariableGroup,
	type: 'document',
	liveEdit: true,
	fieldsets: [{ name: 'links', options: { columns: 2 } }],
	fields: [
		orderRankField({ type: 'project' }),
		defineField({
			name: 'url',
			title: 'URL',
			type: 'url',
			validation: (Rule) => Rule.required(),
			fieldset: 'links',
		}),
		defineField({
			name: 'date',
			type: 'date',
		}),
		defineField({
			name: 'repo',
			type: 'string',
			fieldset: 'links',
		}),
		defineField({
			name: 'screenshots',
			type: 'array',
			of: [{ type: 'image' }],
			options: {
				layout: 'grid',
			},
		}),
		defineField({
			name: 'metadata',
			type: 'metadata',
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: 'metadata.title',
			slug: 'metadata.slug.current',
			media: 'screenshots.0.asset',
		},
		prepare: ({ title, media, slug }) => ({
			title,
			subtitle: slug && `/${slug}`,
			media,
		}),
	},
})
