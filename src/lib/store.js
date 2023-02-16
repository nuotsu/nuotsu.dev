import { writable } from 'svelte/store'
import supabase from './supabase'

const { data } = await supabase
	.from('reactions')
	.select('name, count')
	.eq('name', 'website')

export const reactions = writable(data[0])
