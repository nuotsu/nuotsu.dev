import { defineField, defineType } from 'sanity'
import { VscBriefcase } from 'react-icons/vsc'

export default defineType({
	name: 'work',
	title: 'Client work',
	icon: VscBriefcase,
	type: 'document',
	liveEdit: true,
	fields: [
		defineField({
			name: 'url',
			title: 'URL',
			type: 'url',
		}),
	],
	preview: {
		select: {
			url: 'url',
		},
		prepare: ({ url }) => ({
			title: url.replace(/^https?:\/\/(www\.)?/, ''),
		}),
	},
})
