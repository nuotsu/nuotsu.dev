import { defineField, defineType } from 'sanity'
import { VscGlobe } from 'react-icons/vsc'
import { count } from '$lib/utils'

export default defineType({
	name: 'domain',
	title: 'Domain',
	icon: VscGlobe,
	liveEdit: true,
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'subdomains',
			type: 'array',
			options: {
				layout: 'tags',
			},
			of: [{ type: 'string' }],
		}),
	],
	preview: {
		select: {
			name: 'name',
			subdomains: 'subdomains',
		},
		prepare: ({ name, subdomains }) => ({
			title: name,
			subtitle: subdomains && count(subdomains, 'subdomain'),
		}),
	},
})
