import { defineArrayMember, defineField, defineType } from 'sanity'
import { VscChip, VscEyeClosed } from 'react-icons/vsc'
import { IoCarSportSharp } from 'react-icons/io5'
import { CgPokemon } from 'react-icons/cg'

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
		defineField({
			name: 'pokemonTeams',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'team',
					type: 'object',
					fields: [
						defineField({
							name: 'pokemon',
							type: 'array',
							of: [
								defineArrayMember({
									name: 'pokemon',
									type: 'image',
									icon: CgPokemon,
									fields: [
										defineField({
											name: 'alt',
											type: 'string',
										}),
									],
								}),
							],
							validation: (Rule) => Rule.max(6),
						}),
						defineField({
							name: 'hidden',
							type: 'boolean',
						}),
					],
					preview: {
						select: {
							pokemon: 'pokemon',
							hidden: 'hidden',
						},
						prepare: ({ pokemon, hidden }) => ({
							title: pokemon.map((p: any) => p.alt).join('／'),
							media: hidden ? VscEyeClosed : pokemon[0],
						}),
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
