import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'plate',
	title: 'Plate',
	type: 'object',
	fieldsets: [
		{ title: '🇯🇵 Japan', name: 'jp', options: { columns: 3 } },
	],
	fields: [
		defineField({
			name: 'type',
			type: 'string',
			options: {
				list: [
					{ title: '🇺🇸 California', value: 'ca' },
					{ title: '🇺🇸 California 1960s Legacy', value: 'ca-legacy' },
					{ title: '🇯🇵 Japan', value: 'jp' },
				],
			},
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'region',
			type: 'string',
			fieldset: 'jp',
			placeholder: '横浜',
			hidden: ({ parent }) => parent?.type !== 'jp',
		}),
		defineField({
			name: 'class',
			type: 'number',
			fieldset: 'jp',
			placeholder: '100',
			hidden: ({ parent }) => parent?.type !== 'jp',
		}),
		defineField({
			name: 'prefix',
			type: 'string',
			fieldset: 'jp',
			placeholder: 'あ',
			hidden: ({ parent }) => parent?.type !== 'jp',
		}),
		defineField({
			name: 'number',
			type: 'string',
			placeholder: '1ABC123 or 1234',
			validation: Rule => Rule.min(2).max(7),
		}),
	],
})
