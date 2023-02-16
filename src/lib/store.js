import { writable } from 'svelte/store'
import supabase from './supabase'

export async function getReactions() {
	const { data } = await supabase
		.from('reactions')
		.select('name, count')
		.eq('name', 'website')

	reactions.set({ loading: false, ...data[0] })
}

export const reactions = writable({ loading: false })
