import { defineField, defineType } from 'sanity'
import { VscChip } from 'react-icons/vsc'

export default defineType({
	name: 'global',
	title: 'Global',
	icon: VscChip,
	type: 'document',
	liveEdit: true,
	fields: [
		defineField({
			name: 'tagline',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		prepare: () => ({
			title: 'Global',
		}),
	},
})
