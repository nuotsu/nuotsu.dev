import { defineType, defineField } from 'sanity'
import { VscRegex } from 'react-icons/vsc'

export default defineType({
	name: 'domain',
	title: 'Domain',
	type: 'document',
	icon: VscRegex,
	liveEdit: true,
	fields: [
		defineField({
			name: 'name',
			type: 'string',
		}),
	],
})
