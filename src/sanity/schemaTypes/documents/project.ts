import { defineField, defineType } from 'sanity'
import { VscBriefcase, VscEyeClosed } from 'react-icons/vsc'

export default defineType({
	name: 'project',
	title: 'Project',
	icon: VscBriefcase,
	liveEdit: true,
	type: 'document',
	fields: [
		defineField({
			name: 'url',
			title: 'URL',
			type: 'url',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'isClient',
			type: 'boolean',
		}),
		defineField({
			name: 'redacted',
			type: 'boolean',
		}),
	],
	preview: {
		select: {
			url: 'url',
			title: 'title',
			redacted: 'redacted',
		},
		prepare: ({ url, title, redacted }) => ({
			title: url && new URL(url).hostname.replace('www.', ''),
			subtitle: title,
			media: redacted ? VscEyeClosed : VscBriefcase,
		}),
	},
	orderings: [
		{
			name: 'url',
			title: 'URL',
			by: [{ field: 'url', direction: 'asc' }],
		},
	],
})
