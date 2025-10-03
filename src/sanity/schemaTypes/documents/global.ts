import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'global',
	title: 'Global',
	type: 'document',
	liveEdit: true,
	fields: [],
	preview: {
		prepare: () => ({
			title: 'Global',
		}),
	},
})
