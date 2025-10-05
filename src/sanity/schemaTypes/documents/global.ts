import { defineArrayMember, defineField, defineType } from 'sanity'
import { VscChip } from 'react-icons/vsc'
import { IoCarSportSharp } from 'react-icons/io5'

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
		defineField({
			name: 'featuredProjects',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'project' }] }],
		}),
		defineField({
			name: 'cars',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'image',
					type: 'image',
					icon: IoCarSportSharp,
					fields: [
						defineField({
							name: 'alt',
							type: 'text',
							rows: 2,
						}),
					],
					preview: {
						select: {
							title: 'alt',
							media: 'asset',
						},
					},
				}),
			],
		}),
	],
	preview: {
		prepare: () => ({
			title: 'Global',
		}),
	},
})
