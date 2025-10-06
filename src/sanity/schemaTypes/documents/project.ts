import { defineField, defineType } from 'sanity'
import { VscBriefcase, VscSparkle, VscEyeClosed } from 'react-icons/vsc'
import getUrl from '$lib/get-url'

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
			name: 'featured',
			type: 'boolean',
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
			featured: 'featured',
			redacted: 'redacted',
		},
		prepare: ({ url, title, featured, redacted }) => {
			return {
				title: getUrl(url),
				subtitle: title,
				media: featured ? VscSparkle : redacted ? VscEyeClosed : VscBriefcase,
			}
		},
	},
	orderings: [
		{
			name: 'url',
			title: 'URL',
			by: [{ field: 'url', direction: 'asc' }],
		},
	],
})
