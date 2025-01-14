import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'site',
	title: 'Site',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			type: 'object',
			options: {
				columns: 2,
			},
			fields: [
				defineField({
					name: 'desktop',
					type: 'image',
					options: {
						hotspot: true,
					},
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: 'mobile',
					type: 'image',
					options: {
						hotspot: true,
					},
					validation: (Rule) => Rule.required(),
				}),
			],
		}),
	],
	preview: {
		prepare: () => ({
			title: 'Site',
		}),
	},
})
